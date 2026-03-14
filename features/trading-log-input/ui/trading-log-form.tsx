'use client';

import { FormEvent } from 'react';

import { type MarketPricePreview, type StockSuggestion } from '@/entities/trading-log/model/types';

import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface TradingLogFormProps {
    tradeDate: string;
    stockName: string;
    preview: MarketPricePreview | null;
    canSearch: boolean;
    isFetching: boolean;
    isError: boolean;
    errorMessage: string | null;
    suggestions: StockSuggestion[];
    isSuggestionsFetching: boolean;
    shouldShowSuggestions: boolean;
    isSaving: boolean;
    onTradeDateChange: (value: string) => void;
    onStockNameChange: (value: string) => void;
    onStockInputFocus: () => void;
    onStockInputBlur: () => void;
    onSuggestionSelect: (value: string) => void;
    onSearch: (event: FormEvent<HTMLFormElement>) => void;
    onSave: () => void;
}

function calculateRate(base: number, target: number) {
    if (!base) return 0;
    return ((target - base) / base) * 100;
}

function formatRate(value: number) {
    const withSign = value >= 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
    return `${withSign}%`;
}

function getRateIndicator(value: number) {
    if (value > 0) return '▲';
    if (value < 0) return '▼';
    return '■';
}

function getRateTextColorClass(rate: number) {
    if (rate > 0) return 'text-rose-400';
    if (rate < 0) return 'text-sky-400';
    return 'text-emerald-400';
}

export function TradingLogForm({
    tradeDate,
    stockName,
    preview,
    canSearch,
    isFetching,
    isError,
    errorMessage,
    suggestions,
    isSuggestionsFetching,
    shouldShowSuggestions,
    isSaving,
    onTradeDateChange,
    onStockNameChange,
    onStockInputFocus,
    onStockInputBlur,
    onSuggestionSelect,
    onSearch,
    onSave
}: TradingLogFormProps) {
    const nextHighRate = preview ? calculateRate(preview.buyPrice, preview.nextHigh) : 0;
    const nextLowRate = preview ? calculateRate(preview.buyPrice, preview.nextLow) : 0;
    const nextCloseRate = preview ? calculateRate(preview.buyPrice, preview.nextClose) : 0;

    return (
        <Card className="w-full space-y-5 sm:space-y-6">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-100">매매 데이터 입력</h2>
                    <p className="text-sm text-slate-400">매매일과 종목명을 입력하고 조회하면 익일 가격 정보를 자동으로 불러옵니다.</p>
                </div>
            </div>

            <form onSubmit={onSearch} className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="trade-date">매매일</Label>
                    <Input id="trade-date" type="date" value={tradeDate} onChange={(event) => onTradeDateChange(event.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="stock-name">종목명</Label>
                    <div className="relative">
                        <Input
                            id="stock-name"
                            type="text"
                            placeholder="예: 삼성전자 또는 005930"
                            value={stockName}
                            onFocus={onStockInputFocus}
                            onBlur={onStockInputBlur}
                            onChange={(event) => onStockNameChange(event.target.value)}
                        />
                        {shouldShowSuggestions ? (
                            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
                                {isSuggestionsFetching ? (
                                    <p className="px-3 py-2 text-sm text-slate-400">추천 종목을 불러오는 중...</p>
                                ) : (
                                    <ul className="max-h-56 overflow-y-auto py-1">
                                        {suggestions.map((item) => (
                                            <li key={`${item.code}-${item.market}`}>
                                                <button
                                                    type="button"
                                                    className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
                                                    onMouseDown={() => onSuggestionSelect(`${item.name} ${item.code}`)}
                                                >
                                                    <span className="truncate">{item.name}</span>
                                                    <span className="text-xs text-slate-400">
                                                        {item.code} · {item.market}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-1 md:col-span-2">
                    <Button type="submit" disabled={!canSearch || isFetching} className="min-w-20 flex-1 sm:flex-none">
                        {isFetching ? '조회 중...' : '조회'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onSave} disabled={!preview || isSaving} className="min-w-20 flex-1 sm:flex-none">
                        {isSaving ? '저장 중...' : '저장'}
                    </Button>
                </div>
            </form>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h3 className="text-sm font-semibold text-slate-200">조회 결과</h3>
                {isError ? (
                    <p className="mt-3 text-sm text-rose-400">{errorMessage ?? '조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}</p>
                ) : preview ? (
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                        <div className="rounded-lg bg-slate-900 p-3">
                            <p className="text-slate-400">당일 종가(매수가)</p>
                            <p className="mt-1 text-lg font-semibold text-slate-100">{preview.buyPrice.toLocaleString()}원</p>
                        </div>
                        <div className="rounded-lg bg-slate-900 p-3">
                            <p className="text-slate-400">익일 고가</p>
                            <p className={`mt-1 text-lg font-semibold ${getRateTextColorClass(nextHighRate)}`}>
                                {preview.nextHigh.toLocaleString()}원 ({getRateIndicator(nextHighRate)} {formatRate(nextHighRate)})
                            </p>
                        </div>
                        <div className="rounded-lg bg-slate-900 p-3">
                            <p className="text-slate-400">익일 저가</p>
                            <p className={`mt-1 text-lg font-semibold ${getRateTextColorClass(nextLowRate)}`}>
                                {preview.nextLow.toLocaleString()}원 ({getRateIndicator(nextLowRate)} {formatRate(nextLowRate)})
                            </p>
                        </div>
                        <div className="rounded-lg bg-slate-900 p-3">
                            <p className="text-slate-400">익일 종가</p>
                            <p className={`mt-1 text-lg font-semibold ${getRateTextColorClass(nextCloseRate)}`}>
                                {preview.nextClose.toLocaleString()}원 ({getRateIndicator(nextCloseRate)} {formatRate(nextCloseRate)})
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="mt-3 text-sm text-slate-500">아직 조회된 데이터가 없습니다. 날짜와 종목명을 입력하고 조회를 눌러주세요.</p>
                )}
            </div>
        </Card>
    );
}
