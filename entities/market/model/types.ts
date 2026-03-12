export interface FetchMarketStockPriceParams {
    tradeDate: string;
    stockName: string;
}

export interface MarketStockPrice {
    tradeDate: string;
    stockName: string;
    buyPrice: number;
    nextHigh: number;
    nextLow: number;
    nextClose: number;
}
