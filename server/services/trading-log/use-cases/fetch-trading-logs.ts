import 'server-only';

import type { TradingLogItem } from '@/application/types/trading-log';

import { getKrxCatalogRows } from '@/server/services/stock-catalog/repositories/krx-catalog-repository';

import { createServerSupabaseClient } from '../clients/supabase-server-client';
import { TradingLogServiceError } from '../errors';

function resolveMonthRange(month: string) {
    const normalized = month.trim();
    if (!/^\d{4}-\d{2}$/.test(normalized)) {
        throw new TradingLogServiceError(400, 'month 파라미터 형식이 올바르지 않습니다. (YYYY-MM)');
    }

    const start = new Date(`${normalized}-01T00:00:00.000Z`);
    if (Number.isNaN(start.getTime())) {
        throw new TradingLogServiceError(400, 'month 파라미터 날짜가 유효하지 않습니다.');
    }

    const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1));
    return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10)
    };
}

export async function fetchTradingLogs(accessToken?: string, month?: string): Promise<TradingLogItem[]> {
    if (!accessToken) {
        throw new TradingLogServiceError(401, '로그인 상태가 아닙니다.');
    }

    const supabase = createServerSupabaseClient(accessToken);
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser(accessToken);

    if (userError) {
        throw new TradingLogServiceError(401, `로그인 사용자 확인 실패: ${userError.message}`);
    }

    if (!user) {
        throw new TradingLogServiceError(401, '로그인 상태가 아닙니다.');
    }

    let query = supabase.from('trading_logs').select('*');

    if (month) {
        const { startDate, endDate } = resolveMonthRange(month);
        query = query.gte('trade_date', startDate).lt('trade_date', endDate);
    }

    const { data, error } = await query.order('trade_date', { ascending: false }).order('created_at', { ascending: false });

    if (error) {
        throw new TradingLogServiceError(500, `매매 기록 목록 조회 실패: ${error.message}`);
    }

    const logs = (data ?? []) as TradingLogItem[];
    if (!logs.length) return logs;

    const catalog = await getKrxCatalogRows();
    const byCode = new Map(catalog.map((row) => [row.code, row]));
    const byExactName = new Map(catalog.map((row) => [row.name.replace(/\s+/g, '').toLowerCase(), row]));

    return logs.map((log) => {
        const raw = String(log.stock_name ?? '').trim();
        const codeMatch = raw.match(/\b(\d{6})\b/)?.[1];
        const normalizedName = raw.replace(/\s+/g, '').toLowerCase();

        const byCodeHit = codeMatch ? byCode.get(codeMatch) : undefined;
        const byNameHit = byExactName.get(normalizedName);
        const partialNameHit =
            byCodeHit || byNameHit
                ? undefined
                : catalog.find((item) => item.name.replace(/\s+/g, '').toLowerCase().includes(normalizedName));
        const resolved = byCodeHit ?? byNameHit ?? partialNameHit;

        if (!resolved) {
            return {
                ...log,
                stock_code: codeMatch ?? undefined,
                stock_display_name: raw
            };
        }

        return {
            ...log,
            stock_code: resolved.code,
            stock_display_name: resolved.name
        };
    });
}
