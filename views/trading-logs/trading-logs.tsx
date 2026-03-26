'use client';

import { Gnb } from '@/widgets/gnb';
import { TradingLogList } from '@/widgets/trading-log-list';

export function TradingLogsView() {
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 px-4 py-8 pb-28">
            <div className="mx-auto flex w-[80%] max-w-6xl flex-col gap-8">
                <header className="space-y-3">
                    <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                        Stock Overnight Log
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100">매매 기록</h1>
                    <p className="text-sm text-slate-400">월별로 저장된 히스토리를 확인하고, 삭제(관리자) 및 시나리오 수익률을 점검합니다.</p>
                </header>

                <TradingLogList />
            </div>
            <Gnb />
        </main>
    );
}

