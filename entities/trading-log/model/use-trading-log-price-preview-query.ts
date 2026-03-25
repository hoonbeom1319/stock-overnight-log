import { useQuery } from '@tanstack/react-query';

import { tradingLogQueries } from './factory';
import { type FetchTradingLogPricePreviewParams } from './types';

export function useTradingLogPricePreviewQuery(params: FetchTradingLogPricePreviewParams | null) {
    const resolvedParams = {
        tradeDate: params?.tradeDate ?? '',
        stockName: params?.stockName ?? ''
    };

    return useQuery(tradingLogQueries.pricePreview(resolvedParams));
}
