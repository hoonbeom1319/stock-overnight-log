import { useQuery } from '@tanstack/react-query';

import { tradingLogQueries } from '@/entities/trading-log/model/factory';
import { type FetchTradingLogPricePreviewParams } from '@/entities/trading-log/model/types';

export function useTradingLogPricePreviewQuery(params: FetchTradingLogPricePreviewParams | null) {
    const resolvedParams = {
        tradeDate: params?.tradeDate ?? '',
        stockName: params?.stockName ?? ''
    };

    return useQuery(tradingLogQueries.pricePreview(resolvedParams));
}
