import 'server-only';

import type { YahooChartResponse, YahooSearchResponse } from '@/application/types/market-price';

import { toUnixSeconds } from '@/shared/lib/date';


export async function fetchYahooSearch(stockName: string): Promise<YahooSearchResponse> {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(stockName)}&quotesCount=10&newsCount=0&lang=ko-KR&region=KR`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error('한글 종목명 검색이 실패했습니다. 종목코드 6자리(예: 005930)로 입력해주세요.');
        }
        throw new Error(`종목 검색 요청에 실패했습니다. (status: ${response.status})`);
    }

    return (await response.json()) as YahooSearchResponse;
}

export async function fetchYahooChart(symbol: string, tradeDate: string): Promise<YahooChartResponse> {
    const tradeDateUtc = new Date(`${tradeDate}T00:00:00Z`);
    const period1 = toUnixSeconds(new Date(tradeDateUtc.getTime() - 3 * 24 * 60 * 60 * 1000));
    const period2 = toUnixSeconds(new Date(tradeDateUtc.getTime() + 8 * 24 * 60 * 60 * 1000));

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&period1=${period1}&period2=${period2}&events=history&includeAdjustedClose=false`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('시세 차트 요청에 실패했습니다.');
    }

    const payload = (await response.json()) as YahooChartResponse;
    const chartError = payload.chart?.error?.description;
    if (chartError) {
        throw new Error(chartError);
    }

    return payload;
}
