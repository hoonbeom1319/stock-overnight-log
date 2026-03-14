'use client';

import { AuthPanel } from '@/features/auth';

export function LoginView() {
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-200 px-6 py-12 dark:from-slate-950 dark:to-slate-900">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                <header className="space-y-3">
                    <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                        Stock Overnight Log
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">로그인</h1>
                    <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400 md:text-base">
                        로그인 후 매매일지 입력, 조회, 저장 기능을 사용할 수 있습니다.
                    </p>
                </header>

                <AuthPanel />
            </div>
        </main>
    );
}
