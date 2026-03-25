import { mutationOptions, queryOptions } from '@/shared/api/helper';

import { createTradingLog, deleteTradingLog, fetchStockSuggestions, fetchTradingLogPricePreview, fetchTradingLogs } from '../api';

import { type CreateTradingLogParams, type DeleteTradingLogParams, type FetchTradingLogsParams, type FetchTradingLogPricePreviewParams } from './types';

export const tradingLogQueries = {
    all: () => ['trading-log'] as const,
    list: (params?: FetchTradingLogsParams) =>
        queryOptions({
            queryKey: [...tradingLogQueries.all(), 'list', params?.month ?? 'all'],
            queryFn: () => fetchTradingLogs(params)
        }),
    stockSuggestions: (keyword: string) =>
        queryOptions({
            queryKey: [...tradingLogQueries.all(), 'stock-suggestions', keyword],
            queryFn: () => fetchStockSuggestions(keyword),
            enabled: Boolean(keyword.trim())
        }),

    pricePreview: (params: FetchTradingLogPricePreviewParams) =>
        queryOptions({
            queryKey: [...tradingLogQueries.all(), 'price-preview', params.tradeDate, params.stockName],
            queryFn: () => fetchTradingLogPricePreview(params),
            enabled: Boolean(params.tradeDate && params.stockName.trim())
        })
};

export const tradingLogMutations = {
    create: () =>
        mutationOptions({
            mutationKey: [...tradingLogQueries.all(), 'create'],
            mutationFn: (params: CreateTradingLogParams) => createTradingLog(params)
        }),
    delete: () =>
        mutationOptions({
            mutationKey: [...tradingLogQueries.all(), 'delete'],
            mutationFn: (params: DeleteTradingLogParams) => deleteTradingLog(params)
        })
};
