'use client';

import { AuthPanel } from '@/features/auth';

export function LoginView() {
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 px-4 py-8">
            <div className="mx-auto flex w-[80%] max-w-6xl flex-col gap-8">
                <header className="space-y-3">
                    <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase">
                        Stock Overnight Log
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100">로그인</h1>
                    <p className="text-sm text-slate-400">로그인 후 매매일지 입력, 조회, 저장 기능을 사용할 수 있습니다.</p>
                </header>

                <AuthPanel />
            </div>
        </main>
    );
}
