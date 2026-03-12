'use client';

import { useTradingLogsQuery } from '@/entities/trading-log/model/use-trading-logs-query';

import { Card } from '@/shared/ui/card';

export function TradingLogList() {
    const { data, isLoading, isError } = useTradingLogsQuery();

    return (
        <Card className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-slate-100">저장된 매매 기록</h2>
                <p className="mt-1 text-sm text-slate-400">최근 저장된 순서로 표시됩니다.</p>
            </div>

            {isLoading ? (
                <p className="text-sm text-slate-400">기록을 불러오는 중입니다...</p>
            ) : isError ? (
                <p className="text-sm text-rose-400">기록 조회 중 오류가 발생했습니다.</p>
            ) : !data?.length ? (
                <p className="text-sm text-slate-500">아직 저장된 기록이 없습니다.</p>
            ) : (
                <div className="grid gap-3">
                    {data.map((log) => (
                        <article key={log.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-100">{log.stock_name}</p>
                                    <p className="mt-1 text-xs text-slate-400">{log.trade_date}</p>
                                </div>
                                <p className="text-xs text-slate-500">{new Date(log.created_at).toLocaleString('ko-KR')}</p>
                            </div>

                            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 md:grid-cols-4">
                                <div className="rounded-lg bg-slate-900 p-3">
                                    <dt className="text-slate-400">당일 종가</dt>
                                    <dd className="mt-1 font-semibold text-slate-100">{Number(log.buy_price).toLocaleString()}원</dd>
                                </div>
                                <div className="rounded-lg bg-slate-900 p-3">
                                    <dt className="text-slate-400">익일 고가</dt>
                                    <dd className="mt-1 font-semibold text-emerald-400">{Number(log.next_high).toLocaleString()}원</dd>
                                </div>
                                <div className="rounded-lg bg-slate-900 p-3">
                                    <dt className="text-slate-400">익일 저가</dt>
                                    <dd className="mt-1 font-semibold text-rose-400">{Number(log.next_low).toLocaleString()}원</dd>
                                </div>
                                <div className="rounded-lg bg-slate-900 p-3">
                                    <dt className="text-slate-400">익일 종가</dt>
                                    <dd className="mt-1 font-semibold text-sky-400">{Number(log.next_close).toLocaleString()}원</dd>
                                </div>
                            </dl>
                        </article>
                    ))}
                </div>
            )}
        </Card>
    );
}
