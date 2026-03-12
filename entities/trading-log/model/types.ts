export interface TradingLog {
    id: string;
    user_id: string;
    trade_date: string;
    stock_name: string;
    buy_price: number;
    next_high: number;
    next_low: number;
    next_close: number;
    created_at: string;
}

export interface FetchTradingLogPricePreviewParams {
    tradeDate: string;
    stockName: string;
}

export interface TradingLogPricePreview {
    buyPrice: number;
    nextHigh: number;
    nextLow: number;
    nextClose: number;
}

export interface CreateTradingLogParams {
    tradeDate: string;
    stockName: string;
    buyPrice: number;
    nextHigh: number;
    nextLow: number;
    nextClose: number;
}

export interface StockSuggestion {
    code: string;
    name: string;
    market: 'KOSPI' | 'KOSDAQ';
}
