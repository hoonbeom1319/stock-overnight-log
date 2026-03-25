import 'server-only';

import type { MarketPricePreview } from '@/application/types/market-price';


import { resolveKrxStockByInput } from '@/server/services/stock-catalog';

import { fetchYahooChart, fetchYahooSearch } from '../clients/yahoo-client';
import { MarketPriceServiceError, PREVIEW_NOT_FOUND_MESSAGE, SYMBOL_NOT_FOUND_MESSAGE } from '../errors';
import { resolveSymbolsFromInput } from '../lib/symbol-resolver';
import { createCandleSeries, resolvePreview, resolveSymbols } from '../mappers/market-price-preview';

export async function resolveMarketPricePreview(tradeDate: string, stockName: string): Promise<MarketPricePreview> {
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
        throw new MarketPriceServiceError(404, SYMBOL_NOT_FOUND_MESSAGE);
    }

    for (const symbol of symbols) {
        try {
            const chart = await fetchYahooChart(symbol, tradeDate);
            const candles = createCandleSeries(chart);
            const preview = resolvePreview(tradeDate, candles);
            if (!preview) continue;

            return preview;
        } catch {
            continue;
        }
    }

    throw new MarketPriceServiceError(404, PREVIEW_NOT_FOUND_MESSAGE);
}
