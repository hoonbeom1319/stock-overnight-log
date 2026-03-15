import {
    type CreateTradingLogParams,
    type DeleteTradingLogParams,
    type FetchTradingLogsParams,
    type FetchTradingLogPricePreviewParams,
    type MarketPricePreview,
    type StockSuggestion,
    type TradingLog
} from '@/entities/trading-log/model/types';

import { supabase } from '@/shared/api/supabase/client';

async function createAuthHeaders(): Promise<Record<string, string>> {
    const {
        data: { session },
        error
    } = await supabase.auth.getSession();

    if (error) {
        throw new Error(`세션 조회 실패: ${error.message}`);
    }

    const headers: Record<string, string> = {};
    if (session?.access_token) {
        headers.Authorization = `Bearer ${session.access_token}`;
    }

    return headers;
}

export async function fetchTradingLogPricePreview(params: FetchTradingLogPricePreviewParams): Promise<MarketPricePreview> {
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

    const payload = (await response.json()) as MarketPricePreview;
    return payload;
}

export async function fetchTradingLogs(params?: FetchTradingLogsParams): Promise<TradingLog[]> {
    const searchParams = new URLSearchParams();
    if (params?.month) {
        searchParams.set('month', params.month);
    }

    const query = searchParams.toString();
    const endpoint = query ? `/api/trading-logs?${query}` : '/api/trading-logs';

    const response = await fetch(endpoint, {
        headers: await createAuthHeaders()
    });

    if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
        const message = errorPayload?.message ?? '매매 기록 목록 조회에 실패했습니다.';
        throw new Error(message);
    }

    const payload = (await response.json()) as TradingLog[];
    return payload;
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
    const response = await fetch('/api/trading-logs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(await createAuthHeaders())
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
        const message = errorPayload?.message ?? '매매 기록 저장에 실패했습니다.';
        throw new Error(message);
    }

    const payload = (await response.json()) as TradingLog;
    return payload;
}

export async function deleteTradingLog(params: DeleteTradingLogParams): Promise<TradingLog> {
    const searchParams = new URLSearchParams({ id: params.id });
    const response = await fetch(`/api/trading-logs?${searchParams.toString()}`, {
        method: 'DELETE',
        headers: await createAuthHeaders()
    });

    if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
        const message = errorPayload?.message ?? '매매 기록 삭제에 실패했습니다.';
        throw new Error(message);
    }

    const payload = (await response.json()) as TradingLog;
    return payload;
}
