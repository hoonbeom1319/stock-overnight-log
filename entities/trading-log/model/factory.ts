import { createTradingLog, fetchStockSuggestions, fetchTradingLogPricePreview, fetchTradingLogs } from '@/entities/trading-log/api';
import { type CreateTradingLogParams, type FetchTradingLogPricePreviewParams } from '@/entities/trading-log/model/types';

import { mutationOptions, queryOptions } from '@/shared/api/helper';

export const tradingLogQueries = {
    all: () => ['trading-log'] as const,
    list: () =>
        queryOptions({
            queryKey: [...tradingLogQueries.all(), 'list'],
            queryFn: fetchTradingLogs
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
        })
};
