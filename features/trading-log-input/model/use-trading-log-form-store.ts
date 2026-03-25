import { create } from "zustand";

import type { MarketPricePreview } from '@/entities/trading-log/model/types';

import { TradingLogFormState } from './types';

interface TradingLogFormStore extends TradingLogFormState {
  setTradeDate: (date: string) => void;
  setStockName: (name: string) => void;
  setPreview: (preview: MarketPricePreview | null) => void;
  resetPreview: () => void;
}

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

export const useTradingLogFormStore = create<TradingLogFormStore>((set) => ({
  tradeDate: getTodayDate(),
  stockName: "",
  preview: null,
  setTradeDate: (tradeDate) => set({ tradeDate }),
  setStockName: (stockName) => set({ stockName }),
  setPreview: (preview) => set({ preview }),
  resetPreview: () => set({ preview: null }),
}));
