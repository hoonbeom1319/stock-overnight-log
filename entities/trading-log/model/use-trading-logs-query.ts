import { useQuery } from '@tanstack/react-query';

import { tradingLogQueries } from '@/entities/trading-log/model/factory';
import { type FetchTradingLogsParams } from '@/entities/trading-log/model/types';

export function useTradingLogsQuery(params?: FetchTradingLogsParams) {
    return useQuery(tradingLogQueries.list(params));
}
