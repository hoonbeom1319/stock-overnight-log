import { queryOptions } from '@/shared/api/helper';

import { getMarketStockPrice } from '../api';

import { type FetchMarketStockPriceParams } from './types';

export const marketQueries = {
    all: () => ['market'] as const,

    stockPrice: (params: FetchMarketStockPriceParams) =>
        queryOptions({
            queryKey: [...marketQueries.all(), 'stock-price', params.tradeDate, params.stockName],
            queryFn: () => getMarketStockPrice(params),
            enabled: Boolean(params.tradeDate && params.stockName.trim())
        })
};
