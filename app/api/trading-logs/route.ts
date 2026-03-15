import { NextRequest, NextResponse } from 'next/server';

import type { CreateTradingLogRequest, TradingLogErrorResponse, TradingLogItem } from '@/application/types/trading-log';

import { createTradingLog, deleteTradingLog, fetchTradingLogs, TradingLogServiceError } from '@/server/services/trading-log';

function getAccessToken(request: NextRequest) {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
        return undefined;
    }

    return authorization.slice('Bearer '.length).trim() || undefined;
}

export async function GET(request: NextRequest) {
    try {
        const accessToken = getAccessToken(request);
        const month = request.nextUrl.searchParams.get('month') ?? undefined;
        const logs = await fetchTradingLogs(accessToken, month);
        return NextResponse.json<TradingLogItem[]>(logs);
    } catch (error) {
        if (error instanceof TradingLogServiceError) {
            return NextResponse.json<TradingLogErrorResponse>({ message: error.message }, { status: error.status });
        }

        const message = error instanceof Error ? error.message : '매매 기록 목록 조회 중 오류가 발생했습니다.';
        return NextResponse.json<TradingLogErrorResponse>({ message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = (await request.json()) as Partial<CreateTradingLogRequest>;
        const accessToken = getAccessToken(request);

        if (
            !payload.tradeDate ||
            !payload.stockName?.trim() ||
            typeof payload.buyPrice !== 'number' ||
            typeof payload.nextHigh !== 'number' ||
            typeof payload.nextLow !== 'number' ||
            typeof payload.nextClose !== 'number'
        ) {
            return NextResponse.json<TradingLogErrorResponse>({ message: '요청 데이터 형식이 올바르지 않습니다.' }, { status: 400 });
        }

        const created = await createTradingLog(
            {
                tradeDate: payload.tradeDate,
                stockName: payload.stockName,
                buyPrice: payload.buyPrice,
                nextHigh: payload.nextHigh,
                nextLow: payload.nextLow,
                nextClose: payload.nextClose
            },
            accessToken
        );

        return NextResponse.json<TradingLogItem>(created);
    } catch (error) {
        if (error instanceof TradingLogServiceError) {
            return NextResponse.json<TradingLogErrorResponse>({ message: error.message }, { status: error.status });
        }

        const message = error instanceof Error ? error.message : '매매 기록 저장 중 오류가 발생했습니다.';
        return NextResponse.json<TradingLogErrorResponse>({ message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const accessToken = getAccessToken(request);
        const id = request.nextUrl.searchParams.get('id') ?? '';

        if (!id.trim()) {
            return NextResponse.json<TradingLogErrorResponse>({ message: '삭제할 매매 기록 id가 필요합니다.' }, { status: 400 });
        }

        const deleted = await deleteTradingLog(id, accessToken);
        return NextResponse.json<TradingLogItem>(deleted);
    } catch (error) {
        if (error instanceof TradingLogServiceError) {
            return NextResponse.json<TradingLogErrorResponse>({ message: error.message }, { status: error.status });
        }

        const message = error instanceof Error ? error.message : '매매 기록 삭제 중 오류가 발생했습니다.';
        return NextResponse.json<TradingLogErrorResponse>({ message }, { status: 500 });
    }
}
