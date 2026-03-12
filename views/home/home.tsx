'use client';

import { useState } from 'react';

import { TradingLogList } from '@/widgets/trading-log-list';

import { AuthPanel } from '@/features/auth';
import { TradingLogInput } from '@/features/trading-log-input';

import { supabase } from '@/shared/api/supabase/client';
import { useAuthSession } from '@/shared/api/supabase/use-auth-session';
import { Button } from '@/shared/ui/button';

export function HomeView() {
    const { user, isLoading } = useAuthSession();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        const { error } = await supabase.auth.signOut();
        setIsSigningOut(false);

        if (error) {
            window.alert(`로그아웃 실패: ${error.message}`);
            return;
        }

        window.alert('로그아웃되었습니다.');
    };

    return (
        <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-200 px-6 py-12 dark:from-slate-950 dark:to-slate-900">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                <header className="space-y-3">
                    <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                        Stock Overnight Log
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
                        국내 주식 매매일지
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400 md:text-base">
                        시간외 단일가 매수 후 익일 매도 전략을 검증하기 위한 매매 로그를 기록하세요.
                        조회된 시세를 확인한 뒤 저장하면 통계를 위한 데이터셋을 쉽게 구축할 수 있습니다.
                    </p>
                </header>

                {isLoading ? (
                    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-300">세션 확인 중...</section>
                ) : user ? (
                    <>
                        <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                            <p className="text-sm text-slate-300">
                                로그인 계정: <span className="font-semibold text-slate-100">{user.email}</span>
                            </p>
                            <Button type="button" variant="secondary" onClick={handleSignOut} disabled={isSigningOut}>
                                {isSigningOut ? '로그아웃 중...' : '로그아웃'}
                            </Button>
                        </section>

                        <TradingLogInput />
                        <TradingLogList />
                    </>
                ) : (
                    <AuthPanel />
                )}
            </div>
        </main>
    );
}
