export type TradingLogItem = {
    id: string;
    user_id: string;
    trade_date: string;
    stock_name: string;
    buy_price: number;
    next_high: number;
    next_low: number;
    next_close: number;
    created_at: string;
};

export type CreateTradingLogRequest = {
    tradeDate: string;
    stockName: string;
    buyPrice: number;
    nextHigh: number;
    nextLow: number;
    nextClose: number;
};

export type TradingLogErrorResponse = {
    message: string;
};
