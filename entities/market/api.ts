import { type FetchMarketStockPriceParams, type MarketStockPrice } from './model/types';

export async function getMarketStockPrice(params: FetchMarketStockPriceParams): Promise<MarketStockPrice> {
    const { tradeDate, stockName } = params;

    // TODO: 공공데이터포털 또는 yfinance API 연동
    return Promise.resolve({
        tradeDate,
        stockName,
        buyPrice: 0,
        nextHigh: 0,
        nextLow: 0,
        nextClose: 0
    });
}
