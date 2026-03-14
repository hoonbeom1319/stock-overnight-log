import 'server-only';

import type { StockSuggestionItem } from '@/application/types/stock-suggestions';

import { fetchYahooSearch } from '@/server/services/market-price/clients/yahoo-client';
import { searchKrxStockSuggestions } from '@/server/services/stock-catalog';
import { searchStockAliases } from '@/server/services/stock-catalog/repositories/stock-alias-repository';
import { toStockSuggestionItem } from '@/server/services/stock-suggestions/mappers/to-stock-suggestion-item';

export async function searchStockSuggestions(keyword: string): Promise<StockSuggestionItem[]> {
    const [aliasSuggestions, krxSuggestions] = await Promise.all([searchStockAliases(keyword), searchKrxStockSuggestions(keyword)]);

    const merged = [
        ...aliasSuggestions.map((item) => ({
            code: item.code,
            name: item.name,
            market: item.market
        })),
        ...krxSuggestions.map(toStockSuggestionItem)
    ];
    const deduped = Array.from(new Map(merged.map((item) => [item.code, item])).values()).slice(0, 8);
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

        return [
            {
                code: explicitCode,
                name,
                market
            }
        ];
    } catch {
        return [];
    }
}
