import { useQuery } from '@tanstack/react-query';

import { tradingLogQueries } from './factory';

export function useStockSuggestionsQuery(keyword: string) {
    return useQuery(tradingLogQueries.stockSuggestions(keyword));
}
