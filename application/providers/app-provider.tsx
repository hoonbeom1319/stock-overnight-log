'use client';

import { ReactNode } from 'react';

import { QueryProvider } from '@/application/providers/query-provider';

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    return <QueryProvider>{children}</QueryProvider>;
}
