'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { tradingLogQueries } from '@/entities/trading-log/model/factory';
import { useCreateTradingLogMutation } from '@/entities/trading-log/model/use-create-trading-log-mutation';
import { useStockSuggestionsQuery } from '@/entities/trading-log/model/use-stock-suggestions-query';
import { useTradingLogPricePreviewQuery } from '@/entities/trading-log/model/use-trading-log-price-preview-query';

import { useTradingLogFormStore } from './model/use-trading-log-form-store';
import { TradingLogForm } from './ui/trading-log-form';

export function TradingLogInput() {
    const [searchParams, setSearchParams] = useState<{ tradeDate: string; stockName: string } | null>(null);
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const [isStockInputFocused, setIsStockInputFocused] = useState(false);
    const queryClient = useQueryClient();

    const { tradeDate, stockName, preview, setTradeDate, setStockName, setPreview } = useTradingLogFormStore();
    const { data, isFetching, isError, error } = useTradingLogPricePreviewQuery(searchParams);
    const { mutateAsync: saveTradingLog, isPending: isSaving } = useCreateTradingLogMutation();
    const { data: suggestions = [], isFetching: isSuggestionsFetching } = useStockSuggestionsQuery(debouncedKeyword);

    const canSearch = useMemo(() => Boolean(tradeDate && stockName.trim()), [stockName, tradeDate]);
    const shouldShowSuggestions = useMemo(
        () => isStockInputFocused && Boolean(stockName.trim()) && (isSuggestionsFetching || suggestions.length > 0),
        [isStockInputFocused, isSuggestionsFetching, stockName, suggestions.length]
    );

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSearch) return;

        setPreview(null);
        setSearchParams({ tradeDate, stockName });
    };

    const handleSave = async () => {
        if (!preview) return;
        const normalizedStockName = stockName.trim();
        const hasSyncedPreview =
            searchParams !== null &&
            searchParams.tradeDate === tradeDate &&
            searchParams.stockName.trim() === normalizedStockName;

        if (!hasSyncedPreview) {
            window.alert('종목명 또는 매매일이 마지막 조회 결과와 다릅니다. 다시 조회한 뒤 저장해주세요.');
            return;
        }

        try {
            await saveTradingLog({
                tradeDate,
                stockName: normalizedStockName,
                buyPrice: preview.buyPrice,
                nextHigh: preview.nextHigh,
                nextLow: preview.nextLow,
                nextClose: preview.nextClose
            });
            const tradingLogListKey = [...tradingLogQueries.all(), 'list'];
            await queryClient.invalidateQueries({ queryKey: tradingLogListKey });
            await queryClient.refetchQueries({ queryKey: tradingLogListKey, type: 'active' });
            window.alert('매매 기록이 저장되었습니다.');
        } catch (error) {
            const message = error instanceof Error ? error.message : '저장 중 오류가 발생했습니다.';
            window.alert(message);
        }
    };

    const handleSelectSuggestion = (value: string) => {
        setStockName(value);
        setPreview(null);
        setSearchParams(null);
        setIsStockInputFocused(false);
    };

    const handleStockInputFocus = () => {
        setIsStockInputFocused(true);
    };

    const handleStockInputBlur = () => {
        setTimeout(() => {
            setIsStockInputFocused(false);
        }, 120);
    };

    const handleTradeDateChange = (value: string) => {
        setTradeDate(value);
        setPreview(null);
        setSearchParams(null);
    };

    const handleStockNameChange = (value: string) => {
        setStockName(value);
        setPreview(null);
        setSearchParams(null);
    };

    useEffect(() => {
        if (!searchParams) return;
        setPreview(data ?? null);
    }, [data, searchParams, setPreview]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(stockName.trim());
        }, 250);

        return () => clearTimeout(timer);
    }, [stockName]);

    return (
        <TradingLogForm
            tradeDate={tradeDate}
            stockName={stockName}
            preview={preview}
            canSearch={canSearch}
            isFetching={isFetching}
            isError={isError}
            errorMessage={error instanceof Error ? error.message : null}
            suggestions={suggestions}
            isSuggestionsFetching={isSuggestionsFetching}
            shouldShowSuggestions={shouldShowSuggestions}
            isSaving={isSaving}
            onTradeDateChange={handleTradeDateChange}
            onStockNameChange={handleStockNameChange}
            onStockInputFocus={handleStockInputFocus}
            onStockInputBlur={handleStockInputBlur}
            onSuggestionSelect={handleSelectSuggestion}
            onSearch={handleSearch}
            onSave={handleSave}
        />
    );
}
