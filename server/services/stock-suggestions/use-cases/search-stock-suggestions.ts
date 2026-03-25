import 'server-only';

import type { StockSuggestionItem } from '@/application/types/stock-suggestions';

import { fetchYahooSearch } from '@/server/services/market-price/clients/yahoo-client';
import { searchKrxStockSuggestions } from '@/server/services/stock-catalog';

import { toStockSuggestionItem } from '../mappers/to-stock-suggestion-item';

export async function searchStockSuggestions(keyword: string): Promise<StockSuggestionItem[]> {
    const krxSuggestions = await searchKrxStockSuggestions(keyword);
    const deduped = Array.from(new Map(krxSuggestions.map((item) => [item.code, toStockSuggestionItem(item)])).values()).slice(0, 8);
    if (deduped.length) {
        return deduped;
    }

    const explicitCode = keyword.match(/\b(\d{6})\b/)?.[1];
    if (!explicitCode) {
        return [];
    }

    try {
        const yahoo = await fetchYahooSearch(explicitCode);
        const matched = (yahoo.quotes ?? []).find((quote) => {
            const symbol = quote.symbol ?? '';
            return (symbol === `${explicitCode}.KS` || symbol === `${explicitCode}.KQ`) && (symbol.endsWith('.KS') || symbol.endsWith('.KQ'));
        });

        if (!matched?.symbol) {
            return [];
        }

        const market = matched.symbol.endsWith('.KS') ? 'KOSPI' : 'KOSDAQ';
        const name = matched.shortname ?? matched.longname ?? explicitCode;

        return [{ code: explicitCode, name, market }];
    } catch {
        return [];
    }
}
