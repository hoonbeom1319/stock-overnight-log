import { ReactNode } from 'react';

import { getDesignSystemNav } from '../lib/helper.server';

import { DesktopNav, MobileNav } from './nav';

export const Layout = async ({ children }: { children: ReactNode }) => {
    const nav = await getDesignSystemNav();

    return (
        <div className="min-h-dvh bg-slate-50">
            <div className="z-header fixed top-0 right-0 left-0 h-16 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl">
                <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between font-semibold tracking-tight">
                    <div className="flex items-center gap-2">
                        <MobileNav nav={nav} />
                        <span className="text-slate-900">Design System</span>
                    </div>
                    <div className="hidden text-xs font-medium tracking-wide text-slate-500 md:block">Semantic Accessible Design System</div>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-[1600px] gap-4 px-4 pt-16">
                <DesktopNav nav={nav} />
                <main className="min-w-0 flex-1 px-2 py-8 md:px-6">{children}</main>
            </div>
        </div>
    );
};
