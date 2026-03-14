import { create } from "zustand";

import { TradingLogFormState } from "@/features/trading-log-input/model/types";

import type { MarketPricePreview } from '@/entities/trading-log/model/types';

interface TradingLogFormStore extends TradingLogFormState {
  setTradeDate: (date: string) => void;
  setStockName: (name: string) => void;
  setPreview: (preview: MarketPricePreview | null) => void;
  resetPreview: () => void;
}

export const useTradingLogFormStore = create<TradingLogFormStore>((set) => ({
  tradeDate: "",
  stockName: "",
  preview: null,
  setTradeDate: (tradeDate) => set({ tradeDate }),
  setStockName: (stockName) => set({ stockName }),
  setPreview: (preview) => set({ preview }),
  resetPreview: () => set({ preview: null }),
}));
