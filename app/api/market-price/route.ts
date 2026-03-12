import { NextRequest, NextResponse } from 'next/server';

import { resolveKrxStockByInput } from '@/shared/api/stock/krx-catalog';

interface YahooSearchResponse {
    quotes?: Array<{
        symbol?: string;
        shortname?: string;
        longname?: string;
        quoteType?: string;
    }>;
}

interface YahooChartResponse {
    chart?: {
        result?: Array<{
            timestamp?: number[];
            indicators?: {
                quote?: Array<{
                    high?: Array<number | null>;
                    low?: Array<number | null>;
                    close?: Array<number | null>;
                }>;
            };
        }>;
        error?: { description?: string | null };
    };
}

interface Candle {
    date: string;
    high: number | null;
    low: number | null;
    close: number | null;
}

function toKstDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleDateString('en-CA', {
        timeZone: 'Asia/Seoul'
    });
}

function toUnixSeconds(date: Date) {
    return Math.floor(date.getTime() / 1000);
}

function createCandleSeries(response: YahooChartResponse): Candle[] {
    const result = response.chart?.result?.[0];
    const timestamps = result?.timestamp ?? [];
    const quote = result?.indicators?.quote?.[0];
    const highs = quote?.high ?? [];
    const lows = quote?.low ?? [];
    const closes = quote?.close ?? [];

    return timestamps.map((timestamp, index) => ({
        date: toKstDate(timestamp),
        high: highs[index] ?? null,
        low: lows[index] ?? null,
        close: closes[index] ?? null
    }));
}

function resolveSymbols(stockName: string, response: YahooSearchResponse) {
    const quotes = response.quotes ?? [];
    const exactKorean = quotes.filter((quote) => {
        const label = `${quote.shortname ?? ''} ${quote.longname ?? ''}`.toLowerCase();
        const normalizedStockName = stockName.toLowerCase();
        return label.includes(normalizedStockName) && (quote.symbol?.endsWith('.KS') || quote.symbol?.endsWith('.KQ'));
    });

    if (exactKorean.length) {
        return exactKorean.map((quote) => quote.symbol).filter((value): value is string => Boolean(value));
    }

    const koreanMarket = quotes.filter((quote) => quote.symbol?.endsWith('.KS') || quote.symbol?.endsWith('.KQ'));
    return koreanMarket.map((quote) => quote.symbol).filter((value): value is string => Boolean(value));
}

function resolveSymbolsFromInput(stockInput: string) {
    const trimmed = stockInput.trim();
    const explicitSymbol = trimmed.match(/\b(\d{6}\.(KS|KQ))\b/i)?.[1];
    if (explicitSymbol) {
        return [explicitSymbol.toUpperCase()];
    }

    const codeMatch = trimmed.match(/\b(\d{6})\b/)?.[1];
    if (!codeMatch) return [];

    return [`${codeMatch}.KS`, `${codeMatch}.KQ`];
}

async function fetchYahooSearch(stockName: string) {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(stockName)}&quotesCount=10&newsCount=0&lang=ko-KR&region=KR`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error('한글 종목명 검색이 실패했습니다. 종목코드 6자리(예: 005930)로 입력해주세요.');
        }
        throw new Error(`종목 검색 요청에 실패했습니다. (status: ${response.status})`);
    }

    return (await response.json()) as YahooSearchResponse;
}

async function fetchYahooChart(symbol: string, tradeDate: string) {
    const tradeDateUtc = new Date(`${tradeDate}T00:00:00Z`);
    const period1 = toUnixSeconds(new Date(tradeDateUtc.getTime() - 3 * 24 * 60 * 60 * 1000));
    const period2 = toUnixSeconds(new Date(tradeDateUtc.getTime() + 8 * 24 * 60 * 60 * 1000));

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&period1=${period1}&period2=${period2}&events=history&includeAdjustedClose=false`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('시세 차트 요청에 실패했습니다.');
    }

    const payload = (await response.json()) as YahooChartResponse;
    const chartError = payload.chart?.error?.description;
    if (chartError) {
        throw new Error(chartError);
    }

    return payload;
}

function resolvePreview(tradeDate: string, candles: Candle[]) {
    const tradeCandle = candles.find((candle) => candle.date === tradeDate && candle.close !== null);
    const nextCandle = candles.find((candle) => candle.date > tradeDate && candle.high !== null && candle.low !== null && candle.close !== null);

    if (!tradeCandle) return null;
    if (!nextCandle) return null;

    return {
        buyPrice: Math.round(tradeCandle.close as number),
        nextHigh: Math.round(nextCandle.high as number),
        nextLow: Math.round(nextCandle.low as number),
        nextClose: Math.round(nextCandle.close as number)
    };
}

export async function GET(request: NextRequest) {
    const tradeDate = request.nextUrl.searchParams.get('tradeDate') ?? '';
    const stockName = request.nextUrl.searchParams.get('stockName') ?? '';

    if (!tradeDate || !stockName.trim()) {
        return NextResponse.json({ message: 'tradeDate와 stockName은 필수입니다.' }, { status: 400 });
    }

    try {
        const fromInput = resolveSymbolsFromInput(stockName);
        let symbols = [...fromInput];

        if (!symbols.length) {
            const resolved = await resolveKrxStockByInput(stockName);
            if (resolved) {
                symbols = [resolved.yahooSymbol];
            }
        }

        if (!symbols.length) {
            const search = await fetchYahooSearch(stockName.trim());
            symbols = resolveSymbols(stockName, search);
        }

        if (!symbols.length) {
            return NextResponse.json(
                { message: '종목을 찾지 못했습니다. 종목코드 6자리(예: 005930) 또는 코드+시장(005930.KS)로 입력해주세요.' },
                { status: 404 }
            );
        }

        for (const symbol of symbols) {
            try {
                const chart = await fetchYahooChart(symbol, tradeDate);
                const candles = createCandleSeries(chart);
                const preview = resolvePreview(tradeDate, candles);
                if (!preview) continue;

                return NextResponse.json(preview);
            } catch {
                continue;
            }
        }

        return NextResponse.json({ message: '입력한 날짜 기준으로 시세를 찾지 못했습니다. 휴장일 여부를 확인해주세요.' }, { status: 404 });
    } catch (error) {
        const message = error instanceof Error ? error.message : '시세 조회 중 오류가 발생했습니다.';
        return NextResponse.json({ message }, { status: 500 });
    }
}
