import { useQuery } from '@tanstack/react-query';

import { tradingLogQueries } from '@/entities/trading-log/model/factory';

export function useStockSuggestionsQuery(keyword: string) {
    return useQuery(tradingLogQueries.stockSuggestions(keyword));
}
