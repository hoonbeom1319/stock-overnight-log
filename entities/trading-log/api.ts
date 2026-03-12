import {
    type CreateTradingLogParams,
    type FetchTradingLogPricePreviewParams,
    type StockSuggestion,
    type TradingLog,
    type TradingLogPricePreview
} from '@/entities/trading-log/model/types';

import { supabase } from '@/shared/api/supabase/client';

export async function fetchTradingLogPricePreview(params: FetchTradingLogPricePreviewParams): Promise<TradingLogPricePreview> {
    const searchParams = new URLSearchParams({
        tradeDate: params.tradeDate,
        stockName: params.stockName
    });
    const response = await fetch(`/api/market-price?${searchParams.toString()}`);

    if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
        const message = errorPayload?.message ?? '시세 조회에 실패했습니다.';
        throw new Error(message);
    }

    const payload = (await response.json()) as TradingLogPricePreview;
    return payload;
}

export async function fetchTradingLogs(): Promise<TradingLog[]> {
    const { data, error } = await supabase
        .from('trading_logs')
        .select('*')
        .order('trade_date', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`매매 기록 목록 조회 실패: ${error.message}`);
    }

    return (data ?? []) as TradingLog[];
}

export async function fetchStockSuggestions(keyword: string): Promise<StockSuggestion[]> {
    const searchParams = new URLSearchParams({ q: keyword });
    const response = await fetch(`/api/stock-suggestions?${searchParams.toString()}`);

    if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
        const message = errorPayload?.message ?? '종목 자동완성 조회에 실패했습니다.';
        throw new Error(message);
    }

    const payload = (await response.json()) as StockSuggestion[];
    return payload;
}

export async function createTradingLog(params: CreateTradingLogParams): Promise<TradingLog> {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(`로그인 사용자 확인 실패: ${userError.message}`);
    }

    if (!user) {
        throw new Error('로그인 상태가 아닙니다. 다시 로그인 후 저장해주세요.');
    }

    const { data, error } = await supabase
        .from('trading_logs')
        .insert({
            user_id: user.id,
            trade_date: params.tradeDate,
            stock_name: params.stockName,
            buy_price: params.buyPrice,
            next_high: params.nextHigh,
            next_low: params.nextLow,
            next_close: params.nextClose
        })
        .select('*')
        .single();

    if (error) {
        throw new Error(`매매 기록 저장 실패: ${error.message}`);
    }

    return data as TradingLog;
}
