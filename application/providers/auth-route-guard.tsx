'use client';

import { ReactNode, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useAuthSession } from '@/shared/api/supabase/use-auth-session';

type AuthRouteGuardProps = {
    children: ReactNode;
};

const PUBLIC_PATHS = new Set(['/login']);

export function AuthRouteGuard({ children }: AuthRouteGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoading } = useAuthSession();

    const isPublicPath = PUBLIC_PATHS.has(pathname);

    useEffect(() => {
        if (isLoading) return;

        if (!user && !isPublicPath) {
            router.replace('/login');
            return;
        }

        if (user && pathname === '/login') {
            router.replace('/');
        }
    }, [isLoading, isPublicPath, pathname, router, user]);

    if (isLoading) {
        return <div className="p-6 text-sm text-slate-500 dark:text-slate-400">세션 확인 중...</div>;
    }

    if (!user && !isPublicPath) return null;
    if (user && pathname === '/login') return null;

    return <>{children}</>;
}
