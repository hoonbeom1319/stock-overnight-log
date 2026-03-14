import 'server-only';

import type { TradingLogItem } from '@/application/types/trading-log';

import { createServerSupabaseClient } from '@/server/services/trading-log/clients/supabase-server-client';
import { TradingLogServiceError } from '@/server/services/trading-log/errors';

export async function fetchTradingLogs(accessToken?: string): Promise<TradingLogItem[]> {
    if (!accessToken) {
        throw new TradingLogServiceError(401, '로그인 상태가 아닙니다.');
    }

    const supabase = createServerSupabaseClient(accessToken);
    const { data, error } = await supabase
        .from('trading_logs')
        .select('*')
        .order('trade_date', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        throw new TradingLogServiceError(500, `매매 기록 목록 조회 실패: ${error.message}`);
    }

    return (data ?? []) as TradingLogItem[];
}
