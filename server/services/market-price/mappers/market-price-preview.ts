import 'server-only';

import type { Candle, MarketPricePreview, YahooChartResponse, YahooSearchResponse } from '@/application/types/market-price';

import { toKstDateString } from '@/shared/lib/date';


export function createCandleSeries(response: YahooChartResponse): Candle[] {
    const result = response.chart?.result?.[0];
    const timestamps = result?.timestamp ?? [];
    const quote = result?.indicators?.quote?.[0];
    const highs = quote?.high ?? [];
    const lows = quote?.low ?? [];
    const closes = quote?.close ?? [];

    return timestamps.map((timestamp, index) => ({
        date: toKstDateString(timestamp),
        high: highs[index] ?? null,
        low: lows[index] ?? null,
        close: closes[index] ?? null
    }));
}

export function resolveSymbols(stockName: string, response: YahooSearchResponse) {
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

export function resolvePreview(tradeDate: string, candles: Candle[]): MarketPricePreview | null {
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
