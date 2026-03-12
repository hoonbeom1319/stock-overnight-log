import { useQuery } from '@tanstack/react-query';

import { marketQueries } from '@/entities/market/model/factory';
import { type FetchMarketStockPriceParams } from '@/entities/market/model/types';

export function useMarketStockPriceQuery(params: FetchMarketStockPriceParams | null) {
    const resolvedParams = {
        tradeDate: params?.tradeDate ?? '',
        stockName: params?.stockName ?? ''
    };

    return useQuery(marketQueries.stockPrice(resolvedParams));
}
