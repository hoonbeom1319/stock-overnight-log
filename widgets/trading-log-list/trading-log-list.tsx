'use client';

import { useEffect, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { tradingLogQueries } from '@/entities/trading-log/model/factory';
import { useDeleteTradingLogMutation } from '@/entities/trading-log/model/use-delete-trading-log-mutation';
import { useTradingLogsQuery } from '@/entities/trading-log/model/use-trading-logs-query';

import { useAuthSession } from '@/shared/api/supabase/use-auth-session';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

function getDefaultMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function calculateRate(base: number, target: number) {
    if (!base) return 0;
    return ((target - base) / base) * 100;
}

function formatPrice(value: number) {
    return `${Number(value).toLocaleString()}원`;
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

export function TradingLogList() {
    const [selectedMonth, setSelectedMonth] = useState(getDefaultMonth);
    const [sellTargetRate, setSellTargetRate] = useState(5);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { user } = useAuthSession();
    const { data, isLoading, isError } = useTradingLogsQuery({ month: selectedMonth });
    const { mutateAsync: deleteLog, isPending: isDeleting } = useDeleteTradingLogMutation();
    const isDeleteAllowed = user?.email?.trim().toLowerCase() === 'hoonbeom1319@gmail.com';

    const handleDelete = async (id: string) => {
        if (!isDeleteAllowed) return;
        if (pendingDeleteId !== id) {
            setPendingDeleteId(id);
            return;
        }

        try {
            await deleteLog({ id });
            setPendingDeleteId(null);
            const tradingLogListKey = [...tradingLogQueries.all(), 'list'];
            await queryClient.invalidateQueries({ queryKey: tradingLogListKey });
            await queryClient.refetchQueries({ queryKey: tradingLogListKey, type: 'active' });
            window.alert('매매 기록이 삭제되었습니다.');
        } catch (error) {
            const message = error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.';
            window.alert(message);
        }
    };

    const rows = useMemo(
        () =>
            (data ?? []).map((log) => {
                const buyPrice = Number(log.buy_price);
                const nextHigh = Number(log.next_high);
                const nextClose = Number(log.next_close);
                const targetSellPrice = Math.round(buyPrice * (1 + sellTargetRate / 100));
                const sellPrice = nextHigh >= targetSellPrice ? targetSellPrice : nextClose;

                return {
                    ...log,
                    buyPrice,
                    nextHigh,
                    nextClose,
                    sellPrice,
                    nextHighRate: calculateRate(buyPrice, nextHigh),
                    nextCloseRate: calculateRate(buyPrice, nextClose),
                    sellRate: calculateRate(buyPrice, sellPrice)
                };
            }),
        [data, sellTargetRate]
    );

    const totalSellRate = useMemo(() => rows.reduce((acc, row) => acc + row.sellRate, 0), [rows]);
    const positiveCount = useMemo(() => rows.filter((row) => row.sellRate > 0).length, [rows]);
    const winRate = useMemo(() => (rows.length ? (positiveCount / rows.length) * 100 : 0), [positiveCount, rows.length]);
    const totalHighOnlyRate = useMemo(() => rows.reduce((acc, row) => acc + row.nextHighRate, 0), [rows]);
    const totalCloseOnlyRate = useMemo(() => rows.reduce((acc, row) => acc + row.nextCloseRate, 0), [rows]);

    useEffect(() => {
        if (!pendingDeleteId) return;
        const timer = setTimeout(() => setPendingDeleteId(null), 3000);
        return () => clearTimeout(timer);
    }, [pendingDeleteId]);

    return (
        <Card className="space-y-4">
            <div className="flex flex-col gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-100">저장된 매매 기록</h2>
                    <p className="mt-1 text-sm text-slate-400">월별로 조회하고, 매도 시나리오 수익률을 확인할 수 있습니다.</p>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1 text-sm text-slate-300">
                        조회 월
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(event) => setSelectedMonth(event.target.value)}
                            className="h-11 min-w-40 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-100 focus:border-sky-400 focus:outline-hidden"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-slate-300">
                        목표 수익률 (%)
                        <input
                            type="number"
                            min={0}
                            max={100}
                            step={0.1}
                            value={sellTargetRate}
                            onChange={(event) => {
                                const nextValue = event.target.valueAsNumber;
                                if (Number.isNaN(nextValue)) return;
                                setSellTargetRate(Math.min(100, Math.max(0, nextValue)));
                            }}
                            className="h-11 min-w-32 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-100 focus:border-sky-400 focus:outline-hidden"
                        />
                    </label>
                </div>
            </div>

            {isLoading ? (
                <p className="text-sm text-slate-400">기록을 불러오는 중입니다...</p>
            ) : isError ? (
                <p className="text-sm text-rose-400">기록 조회 중 오류가 발생했습니다.</p>
            ) : !rows.length ? (
                <p className="text-sm text-slate-500">선택한 월에 저장된 기록이 없습니다.</p>
            ) : (
                <>
                    <section className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
                            <p className="text-xs text-slate-500">매도 합계 수익률</p>
                            <p className={`mt-1 text-base font-bold ${getRateTextColorClass(totalSellRate)}`}>
                                {getRateIndicator(totalSellRate)} {formatRate(totalSellRate)}
                            </p>
                        </div>
                        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                            <p className="text-xs text-slate-500">승률</p>
                            <p className={`mt-1 text-base font-bold ${getRateTextColorClass(winRate - 50)}`}>{formatRate(winRate)}</p>
                        </div>
                        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                            <p className="text-xs text-slate-500">월 고가 합산</p>
                            <p className={`mt-1 text-base font-bold ${getRateTextColorClass(totalHighOnlyRate)}`}>
                                {getRateIndicator(totalHighOnlyRate)} {formatRate(totalHighOnlyRate)}
                            </p>
                        </div>
                        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                            <p className="text-xs text-slate-500">월 종가 합산</p>
                            <p className={`mt-1 text-base font-bold ${getRateTextColorClass(totalCloseOnlyRate)}`}>
                                {getRateIndicator(totalCloseOnlyRate)} {formatRate(totalCloseOnlyRate)}
                            </p>
                        </div>
                    </section>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-3">
                        {rows.map((row) => (
                            <article key={row.id} className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                                <div className="flex min-w-0 items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-slate-400">{row.trade_date}</p>
                                        <p className="mt-1 wrap-break-word text-base font-semibold text-slate-100">
                                            {row.stock_display_name ?? row.stock_name}
                                        </p>
                                        <p className="wrap-break-word text-xs text-slate-400">{row.stock_code ? `(${row.stock_code})` : '-'}</p>
                                    </div>
                                    {isDeleteAllowed ? (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className={`h-8 shrink-0 whitespace-nowrap px-3 text-xs ${pendingDeleteId === row.id ? 'border-rose-500/70 text-rose-300 hover:bg-rose-500/10' : ''}`}
                                            onClick={() => handleDelete(row.id)}
                                            disabled={isDeleting}
                                        >
                                            {pendingDeleteId === row.id ? '한번 더' : '삭제'}
                                        </Button>
                                    ) : null}
                                </div>

                                <dl className="mt-3 space-y-2.5 text-sm">
                                    <div className="flex min-w-0 items-baseline justify-between gap-3">
                                        <dt className="shrink-0 text-slate-500">매수가</dt>
                                        <dd className="min-w-0 flex-1 text-right font-semibold whitespace-nowrap tabular-nums text-slate-100">
                                            {formatPrice(row.buyPrice)}
                                        </dd>
                                    </div>
                                    <div className="flex min-w-0 items-baseline justify-between gap-3">
                                        <dt className="shrink-0 text-slate-500">매도 가격</dt>
                                        <dd
                                            className={`min-w-0 flex-1 text-right font-semibold whitespace-nowrap tabular-nums ${getRateTextColorClass(row.sellRate)}`}
                                        >
                                            {formatPrice(row.sellPrice)} ({getRateIndicator(row.sellRate)} {formatRate(row.sellRate)})
                                        </dd>
                                    </div>
                                    <div className="flex min-w-0 items-baseline justify-between gap-3">
                                        <dt className="shrink-0 text-slate-500">익일 고가</dt>
                                        <dd
                                            className={`min-w-0 flex-1 text-right font-semibold whitespace-nowrap tabular-nums ${getRateTextColorClass(row.nextHighRate)}`}
                                        >
                                            {formatPrice(row.nextHigh)} ({getRateIndicator(row.nextHighRate)} {formatRate(row.nextHighRate)})
                                        </dd>
                                    </div>
                                    <div className="flex min-w-0 items-baseline justify-between gap-3">
                                        <dt className="shrink-0 text-slate-500">익일 종가</dt>
                                        <dd
                                            className={`min-w-0 flex-1 text-right font-semibold whitespace-nowrap tabular-nums ${getRateTextColorClass(row.nextCloseRate)}`}
                                        >
                                            {formatPrice(row.nextClose)} ({getRateIndicator(row.nextCloseRate)} {formatRate(row.nextCloseRate)})
                                        </dd>
                                    </div>
                                </dl>
                            </article>
                        ))}

                        <div className="col-span-full rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                            <p className="text-xs text-slate-400">
                                매도 규칙: 익일 고가가 +{sellTargetRate.toFixed(1)}% 이상이면 +{sellTargetRate.toFixed(1)}% 가격 매도, 아니면 익일 종가 매도
                            </p>
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
}
