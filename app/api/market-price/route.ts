import { NextRequest, NextResponse } from 'next/server';

import type { MarketPriceErrorResponse, MarketPricePreview } from '@/application/types/market-price';

import { MarketPriceServiceError, resolveMarketPricePreview } from '@/server/services/market-price';

export async function GET(request: NextRequest) {
    const tradeDate = request.nextUrl.searchParams.get('tradeDate') ?? '';
    const stockName = request.nextUrl.searchParams.get('stockName') ?? '';

    if (!tradeDate || !stockName.trim()) {
        return NextResponse.json<MarketPriceErrorResponse>({ message: 'tradeDate와 stockName은 필수입니다.' }, { status: 400 });
    }

    try {
        const preview = await resolveMarketPricePreview(tradeDate, stockName);
        return NextResponse.json<MarketPricePreview>(preview);
    } catch (error) {
        if (error instanceof MarketPriceServiceError) {
            return NextResponse.json<MarketPriceErrorResponse>({ message: error.message }, { status: error.status });
        }
        const message = error instanceof Error ? error.message : '시세 조회 중 오류가 발생했습니다.';
        return NextResponse.json<MarketPriceErrorResponse>({ message }, { status: 500 });
    }
}
