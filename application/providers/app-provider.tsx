'use client';

import { ReactNode } from 'react';

import { AuthRouteGuard } from '@/application/providers/auth-route-guard';
import { QueryProvider } from '@/application/providers/query-provider';

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <QueryProvider>
            <AuthRouteGuard>{children}</AuthRouteGuard>
        </QueryProvider>
    );
}
