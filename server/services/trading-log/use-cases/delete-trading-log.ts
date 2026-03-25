import 'server-only';

import type { TradingLogItem } from '@/application/types/trading-log';

import { createServerSupabaseClient } from '../clients/supabase-server-client';
import { TradingLogServiceError } from '../errors';
import { isTradingLogAdmin } from '../lib/permissions';

export async function deleteTradingLog(id: string, accessToken?: string): Promise<TradingLogItem> {
    if (!accessToken) {
        throw new TradingLogServiceError(401, '로그인 상태가 아닙니다.');
    }

    const normalizedId = id.trim();
    if (!normalizedId) {
        throw new TradingLogServiceError(400, '삭제할 매매 기록 id가 필요합니다.');
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
        throw new TradingLogServiceError(403, '삭제 권한이 없습니다.');
    }

    const { data, error } = await supabase.from('trading_logs').delete().eq('id', normalizedId).select('*').maybeSingle();

    if (error) {
        throw new TradingLogServiceError(500, `매매 기록 삭제 실패: ${error.message}`);
    }

    if (!data) {
        throw new TradingLogServiceError(404, '삭제할 매매 기록을 찾을 수 없습니다.');
    }

    return data as TradingLogItem;
}
