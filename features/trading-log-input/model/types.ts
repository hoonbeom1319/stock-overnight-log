export interface PricePreview {
  buyPrice: number;
  nextHigh: number;
  nextLow: number;
  nextClose: number;
}

export interface TradingLogFormState {
  tradeDate: string;
  stockName: string;
  preview: PricePreview | null;
}
