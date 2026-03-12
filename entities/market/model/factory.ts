import { getMarketStockPrice } from '@/entities/market/api';
import { type FetchMarketStockPriceParams } from '@/entities/market/model/types';

import { queryOptions } from '@/shared/api/helper';

export const marketQueries = {
    all: () => ['market'] as const,

    stockPrice: (params: FetchMarketStockPriceParams) =>
        queryOptions({
            queryKey: [...marketQueries.all(), 'stock-price', params.tradeDate, params.stockName],
            queryFn: () => getMarketStockPrice(params),
            enabled: Boolean(params.tradeDate && params.stockName.trim())
        })
};
