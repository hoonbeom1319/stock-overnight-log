import { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';

import { AppProvider } from '@/application/providers';


export const metadata: Metadata = {
    title: 'stock-overnight-log',
    description: '국내 주식 시간외 단일가 매매일지'
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko" className="dark">
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
