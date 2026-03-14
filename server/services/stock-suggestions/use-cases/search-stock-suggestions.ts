import 'server-only';

import type { StockSuggestionItem } from '@/application/types/stock-suggestions';

import { searchKrxStockSuggestions } from '@/server/services/stock-catalog';
import { toStockSuggestionItem } from '@/server/services/stock-suggestions/mappers/to-stock-suggestion-item';

export async function searchStockSuggestions(keyword: string): Promise<StockSuggestionItem[]> {
    const suggestions = await searchKrxStockSuggestions(keyword);
    return suggestions.map(toStockSuggestionItem);
}
