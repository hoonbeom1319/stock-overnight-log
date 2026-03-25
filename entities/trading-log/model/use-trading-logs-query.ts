import { useQuery } from '@tanstack/react-query';

import { tradingLogQueries } from './factory';
import { type FetchTradingLogsParams } from './types';

export function useTradingLogsQuery(params?: FetchTradingLogsParams) {
    return useQuery(tradingLogQueries.list(params));
}
