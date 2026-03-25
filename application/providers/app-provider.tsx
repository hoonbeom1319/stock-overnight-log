'use client';

import { ReactNode } from 'react';

import { AuthRouteGuard } from './auth-route-guard';
import { QueryProvider } from './query-provider';

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
