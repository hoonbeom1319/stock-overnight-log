import 'server-only';

import type { StockSuggestionItem } from '@/application/types/stock-suggestions';

import type { KrxStockSuggestion } from '@/server/services/stock-catalog';

export function toStockSuggestionItem(item: KrxStockSuggestion): StockSuggestionItem {
    return {
        code: item.code,
        name: item.name,
        market: item.market
    };
}
