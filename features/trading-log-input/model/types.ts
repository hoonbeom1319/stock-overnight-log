import type { MarketPricePreview } from '@/entities/trading-log/model/types';

export interface TradingLogFormState {
  tradeDate: string;
  stockName: string;
  preview: MarketPricePreview | null;
}
