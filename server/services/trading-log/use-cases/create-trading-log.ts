import 'server-only';

import type { CreateTradingLogRequest, TradingLogItem } from '@/application/types/trading-log';

import { createServerSupabaseClient } from '../clients/supabase-server-client';
import { TradingLogServiceError } from '../errors';
import { isTradingLogAdmin } from '../lib/permissions';

export async function createTradingLog(payload: CreateTradingLogRequest, accessToken?: string): Promise<TradingLogItem> {
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

    if (!isTradingLogAdmin(user.email)) {
        throw new TradingLogServiceError(403, '저장 권한이 없습니다.');
    }

    const { data, error } = await supabase
        .from('trading_logs')
        .insert({
            user_id: user.id,
            trade_date: payload.tradeDate,
            stock_name: payload.stockName,
            buy_price: payload.buyPrice,
            next_high: payload.nextHigh,
            next_low: payload.nextLow,
            next_close: payload.nextClose
        })
        .select('*')
        .single();

    if (error) {
        throw new TradingLogServiceError(500, `매매 기록 저장 실패: ${error.message}`);
    }

    return data as TradingLogItem;
}
