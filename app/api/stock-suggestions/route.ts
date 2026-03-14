import { NextRequest, NextResponse } from 'next/server';

import type { StockSuggestionItem, StockSuggestionsErrorResponse } from '@/application/types/stock-suggestions';

import { searchStockSuggestions } from '@/server/services/stock-suggestions';

export async function GET(request: NextRequest) {
    const keyword = request.nextUrl.searchParams.get('q') ?? '';

    if (!keyword.trim()) {
        return NextResponse.json<StockSuggestionItem[]>([]);
    }

    try {
        const suggestions = await searchStockSuggestions(keyword);
        return NextResponse.json<StockSuggestionItem[]>(suggestions);
    } catch (error) {
        const message = error instanceof Error ? error.message : '종목 자동완성 조회 중 오류가 발생했습니다.';
        return NextResponse.json<StockSuggestionsErrorResponse>({ message }, { status: 500 });
    }
}
