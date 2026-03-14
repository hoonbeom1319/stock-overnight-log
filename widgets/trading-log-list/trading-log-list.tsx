'use client';

import { useMemo, useState } from 'react';

import { useTradingLogsQuery } from '@/entities/trading-log/model/use-trading-logs-query';

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

export function TradingLogList() {
    const [selectedMonth, setSelectedMonth] = useState(getDefaultMonth);
    const [sellTargetRate, setSellTargetRate] = useState(5);
    const { data, isLoading, isError } = useTradingLogsQuery({ month: selectedMonth });

    const rows = useMemo(
        () =>
            (data ?? []).map((log) => {
                const buyPrice = Number(log.buy_price);
                const nextHigh = Number(log.next_high);
                const nextLow = Number(log.next_low);
                const nextClose = Number(log.next_close);
                const targetSellPrice = Math.round(buyPrice * (1 + sellTargetRate / 100));
                const sellPrice = nextHigh >= targetSellPrice ? targetSellPrice : nextClose;

                return {
                    ...log,
                    buyPrice,
                    nextHigh,
                    nextLow,
                    nextClose,
                    sellPrice,
                    nextHighRate: calculateRate(buyPrice, nextHigh),
                    nextLowRate: calculateRate(buyPrice, nextLow),
                    nextCloseRate: calculateRate(buyPrice, nextClose),
                    sellRate: calculateRate(buyPrice, sellPrice)
                };
            }),
        [data, sellTargetRate]
    );

    const totalSellRate = useMemo(() => rows.reduce((acc, row) => acc + row.sellRate, 0), [rows]);
    const averageSellRate = useMemo(() => (rows.length ? totalSellRate / rows.length : 0), [rows.length, totalSellRate]);

    return (
        <Card className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-100">저장된 매매 기록</h2>
                    <p className="mt-1 text-sm text-slate-400">월별로 조회하고, 매도 시나리오 수익률을 확인할 수 있습니다.</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
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
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="min-w-[900px] w-full text-sm">
                        <thead className="bg-slate-900/80 text-slate-300">
                            <tr>
                                <th className="px-3 py-3 text-left font-medium">매매일</th>
                                <th className="px-3 py-3 text-left font-medium">종목명</th>
                                <th className="px-3 py-3 text-right font-medium">매수가(당일 종가)</th>
                                <th className="px-3 py-3 text-right font-medium">익일 고가</th>
                                <th className="px-3 py-3 text-right font-medium">익일 저가</th>
                                <th className="px-3 py-3 text-right font-medium">익일 종가</th>
                                <th className="px-3 py-3 text-right font-medium">매도 가격</th>
                                <th className="px-3 py-3 text-right font-medium">매도 수익률</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-950/40 text-slate-200">
                            {rows.map((row) => (
                                <tr key={row.id}>
                                    <td className="px-3 py-3">{row.trade_date}</td>
                                    <td className="px-3 py-3">
                                        <p className="font-medium text-slate-100">{row.stock_display_name ?? row.stock_name}</p>
                                        <p className="mt-0.5 text-xs text-slate-400">{row.stock_code ? `(${row.stock_code})` : '-'}</p>
                                    </td>
                                    <td className="px-3 py-3 text-right text-slate-100">{formatPrice(row.buyPrice)}</td>
                                    <td className="px-3 py-3 text-right text-emerald-400">
                                        {formatPrice(row.nextHigh)} ({formatRate(row.nextHighRate)})
                                    </td>
                                    <td className="px-3 py-3 text-right text-rose-400">
                                        {formatPrice(row.nextLow)} ({formatRate(row.nextLowRate)})
                                    </td>
                                    <td className="px-3 py-3 text-right text-sky-400">
                                        {formatPrice(row.nextClose)} ({formatRate(row.nextCloseRate)})
                                    </td>
                                    <td className="px-3 py-3 text-right text-amber-300">{formatPrice(row.sellPrice)}</td>
                                    <td className={`px-3 py-3 text-right font-semibold ${row.sellRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {formatRate(row.sellRate)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-slate-900/70 text-slate-100">
                            <tr>
                                <td className="px-3 py-3 font-semibold" colSpan={7}>
                                    하단 합계 (매도 수익률)
                                </td>
                                <td className={`px-3 py-3 text-right font-bold ${totalSellRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {formatRate(totalSellRate)}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-3 pb-3 text-xs text-slate-400" colSpan={8}>
                                    평균 수익률: {formatRate(averageSellRate)} / 매도 규칙: 익일 고가가 +{sellTargetRate.toFixed(1)}% 이상이면 +
                                    {sellTargetRate.toFixed(1)}% 가격 매도, 아니면 익일 종가 매도
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </Card>
    );
}
