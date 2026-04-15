'use client';

import { useCallback, useState } from 'react';

import Link from 'next/link';

type DesignSystemNavGroup = { category: string; components: string[] };

type Props = {
    nav: DesignSystemNavGroup[];
};

function categoryLabel(category: string) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

export function MobileNav({ nav }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = useCallback(() => {
        setIsOpen((v) => !v);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <div className="md:hidden">
            <button
                type="button"
                aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isOpen}
                onClick={handleToggle}
                className="inline-flex size-9 items-center justify-center rounded-md hover:bg-black/5 active:bg-black/10"
            >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" focusable="false">
                    {isOpen ? (
                        <path
                            fill="currentColor"
                            d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.29l6.3 6.3 6.29-6.3z"
                        />
                    ) : (
                        <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                    )}
                </svg>
            </button>

            {isOpen ? (
                <div className="fixed inset-0 z-20">
                    <button type="button" aria-label="메뉴 닫기" onClick={handleClose} className="absolute inset-0 bg-black/40" />

                    <aside className="absolute top-0 left-0 h-full w-[min(86vw,320px)] overflow-auto bg-white pt-3 shadow-xl">
                        <div className="px-3 pb-2 font-semibold tracking-wide">COMPONENTS</div>

                        <nav className="space-y-4 px-2 pb-4">
                            {nav.map((group) => (
                                <div key={group.category}>
                                    <Link
                                        href={`/design-system/${group.category}`}
                                        onClick={handleClose}
                                        className="block rounded-md px-2 py-1.5 font-semibold hover:bg-black/5 active:bg-black/10"
                                    >
                                        {categoryLabel(group.category)}
                                    </Link>
                                    <ul className="mt-1 space-y-0.5">
                                        {group.components.map((name) => (
                                            <li key={`${group.category}/${name}`}>
                                                <Link
                                                    href={`/design-system/${group.category}/${name}`}
                                                    onClick={handleClose}
                                                    className="block rounded-md bg-white px-2 py-1 hover:brightness-95 active:brightness-90"
                                                >
                                                    {name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </aside>
                </div>
            ) : null}
        </div>
    );
}

export function DesktopNav({ nav }: Props) {
    return (
        <aside className="sticky top-11 h-[calc(100dvh-2.75rem)] w-0 overflow-hidden pt-3 pb-2 md:w-[260px] md:overflow-auto shadow">
            <div className="px-2 py-2 tracking-wide">COMPONENTS</div>
            <nav className="space-y-4">
                {nav.map((group) => (
                    <div key={group.category}>
                        <Link href={`/design-system/${group.category}`} className="block rounded-md px-2 py-1.5 font-semibold hover:bg-black/5">
                            {categoryLabel(group.category)}
                        </Link>
                        <ul className="mt-1 space-y-0.5">
                            {group.components.map((name) => (
                                <li key={`${group.category}/${name}`}>
                                    <Link
                                        href={`/design-system/${group.category}/${name}`}
                                        className="block rounded-md bg-white px-2 py-1 hover:brightness-95 active:brightness-90"
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
