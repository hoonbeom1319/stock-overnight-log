import { ReactNode } from 'react';

import { getDesignSystemNav } from '../lib/helper.server';

import { DesktopNav, MobileNav } from './nav';

export const Layout = async ({ children }: { children: ReactNode }) => {
    const nav = await getDesignSystemNav();

    return (
        <>
            <div className="z-header fixed top-0 right-0 left-0 flex h-11 items-center border-b bg-white px-4">
                <div className="flex items-center justify-between font-semibold tracking-tight">
                    <div className="flex items-center gap-2">
                        <MobileNav nav={nav} />
                        <span>Design System</span>
                    </div>
                </div>
            </div>

            <div className="flex px-4">
                <DesktopNav nav={nav} />
                <main className="sticky top-14 min-h-dvh min-w-0 flex-1 px-10 pt-14 pb-4">{children}</main>
            </div>
        </>
    );
};
