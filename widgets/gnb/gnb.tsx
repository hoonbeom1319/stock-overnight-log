'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
    href: string;
    label: string;
    icon: ReactNode;
};

function HomeIcon({ isActive }: { isActive: boolean }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={isActive ? 'h-5 w-5 text-sky-300' : 'h-5 w-5 text-slate-400'}
            fill="none"
        >
            <path
                d="M3.5 10.5L12 3.5l8.5 7v9.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V10.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M9 22v-7a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 15v7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ListIcon({ isActive }: { isActive: boolean }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={isActive ? 'h-5 w-5 text-sky-300' : 'h-5 w-5 text-slate-400'}
            fill="none"
        >
            <path
                d="M8 6h13M8 12h13M8 18h13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M4.5 6.5h.01M4.5 12.5h.01M4.5 18.5h.01"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function Gnb() {
    const pathname = usePathname();

    const items: NavItem[] = [
        { href: '/', label: '홈', icon: <HomeIcon isActive={pathname === '/'} /> },
        {
            href: '/trading-logs',
            label: '매매기록',
            icon: <ListIcon isActive={pathname === '/trading-logs'} />
        }
    ];

    return (
        <nav
            aria-label="전역 내비게이션"
            className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800/70 bg-slate-950/60 backdrop-blur supports-backdrop-filter:bg-slate-950/40"
        >
            <div className="mx-auto flex w-[80%] max-w-6xl items-stretch justify-around px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
                {items.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? 'page' : undefined}
                            className={[
                                'group relative flex min-w-[104px] flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold tracking-tight transition',
                                'hb-focus-ring-primary focus-visible:ring-offset-0',
                                isActive ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'
                            ].join(' ')}
                        >
                            <span className="grid place-items-center">{item.icon}</span>
                            <span>{item.label}</span>
                            <span
                                aria-hidden="true"
                                className={[
                                    'absolute -top-0.5 left-1/2 h-[3px] w-10 -translate-x-1/2 rounded-full transition',
                                    isActive ? 'bg-sky-400' : 'bg-transparent group-hover:bg-slate-700'
                                ].join(' ')}
                            />
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

