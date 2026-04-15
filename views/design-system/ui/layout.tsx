import { ReactNode } from 'react';

import { getDesignSystemNav } from '../lib/helper.server';

import { DesktopNav, MobileNav } from './nav';

export const Layout = async ({ children }: { children: ReactNode }) => {
    const nav = await getDesignSystemNav();

    return (
        <>
            <div className="z-header fixed top-0 right-0 left-0 border-b bg-white">
                <div className="mx-auto flex h-11 max-w-6xl items-center justify-between px-2 font-semibold tracking-tight">
                    <div className="flex items-center gap-2">
                        <MobileNav nav={nav} />
                        <span>Design System</span>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex max-w-6xl">
                <DesktopNav nav={nav} />
                <main className="sticky top-14 min-h-dvh w-full min-w-0 px-6 pt-14 pb-4">{children}</main>
            </div>
        </>
    );
};
