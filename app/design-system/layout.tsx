import type { ReactNode } from 'react';

import Link from 'next/link';

import { getDesignSystemNav } from '@/app/design-system/_server/nav';

function categoryLabel(category: string) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

export default async function DesignSystemLayout({ children }: { children: ReactNode }) {
    const nav = await getDesignSystemNav();

    return (
        <div className="min-h-dvh">
            <div className="border-b bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/50">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <Link href="/design-system" className="text-sm font-semibold tracking-tight">
                        Design System
                    </Link>
                </div>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr]">
                <aside className="md:sticky md:top-4 md:h-[calc(100dvh-5rem)] md:overflow-auto">
                    <div className="rounded-xl border bg-white p-3">
                        <div className="text-muted-foreground px-2 py-2 text-xs font-medium tracking-wide uppercase">Components</div>
                        <nav className="space-y-4">
                            {nav.map((group) => (
                                <div key={group.category}>
                                    <Link
                                        href={`/design-system/${group.category}`}
                                        className="block rounded-md px-2 py-1.5 text-sm font-semibold hover:bg-black/5"
                                    >
                                        {categoryLabel(group.category)}
                                    </Link>
                                    {group.components.length > 0 ? (
                                        <ul className="mt-1 space-y-0.5">
                                            {group.components.map((name) => (
                                                <li key={`${group.category}/${name}`}>
                                                    <Link
                                                        href={`/design-system/${group.category}/${name}`}
                                                        className="text-muted-foreground block rounded-md px-2 py-1 text-sm hover:bg-black/5 hover:text-black"
                                                    >
                                                        {name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-muted-foreground px-2 py-1 text-xs">개발 예정</div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main className="min-w-0">{children}</main>
            </div>
        </div>
    );
}
