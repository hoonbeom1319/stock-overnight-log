import { NextRequest, NextResponse } from 'next/server';

import { searchKrxStockSuggestions } from '@/shared/api/stock/krx-catalog';

export async function GET(request: NextRequest) {
    const keyword = request.nextUrl.searchParams.get('q') ?? '';

    if (!keyword.trim()) {
        return NextResponse.json([]);
    }

    try {
        const suggestions = await searchKrxStockSuggestions(keyword);
        return NextResponse.json(
            suggestions.map((item) => ({
                code: item.code,
                name: item.name,
                market: item.market
            }))
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : '종목 자동완성 조회 중 오류가 발생했습니다.';
        return NextResponse.json({ message }, { status: 500 });
    }
}
