import { useQuery } from '@tanstack/react-query';

import { tradingLogQueries } from '@/entities/trading-log/model/factory';

export function useTradingLogsQuery() {
    return useQuery(tradingLogQueries.list());
}
