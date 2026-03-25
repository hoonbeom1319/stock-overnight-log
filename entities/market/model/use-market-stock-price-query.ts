import { useQuery } from '@tanstack/react-query';

import { marketQueries } from './factory';
import { type FetchMarketStockPriceParams } from './types';

export function useMarketStockPriceQuery(params: FetchMarketStockPriceParams | null) {
    const resolvedParams = {
        tradeDate: params?.tradeDate ?? '',
        stockName: params?.stockName ?? ''
    };

    return useQuery(marketQueries.stockPrice(resolvedParams));
}
