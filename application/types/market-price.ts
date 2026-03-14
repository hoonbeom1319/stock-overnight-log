import type { MarketPricePreview } from '@/entities/trading-log/model/types';

export type { MarketPricePreview };

export type MarketPriceErrorResponse = {
    message: string;
};

export type YahooSearchResponse = {
    quotes?: Array<{
        symbol?: string;
        shortname?: string;
        longname?: string;
        quoteType?: string;
    }>;
};

export type YahooChartResponse = {
    chart?: {
        result?: Array<{
            timestamp?: number[];
            indicators?: {
                quote?: Array<{
                    high?: Array<number | null>;
                    low?: Array<number | null>;
                    close?: Array<number | null>;
                }>;
            };
        }>;
        error?: { description?: string | null };
    };
};

export type Candle = {
    date: string;
    high: number | null;
    low: number | null;
    close: number | null;
};
