import Link from 'next/link';

import { CATEGORIES } from './lib/const';

export const DesignSystem = () => {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6">
                <div className="text-muted-foreground text-xs font-medium tracking-wide">DESIGN SYSTEM</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">컴포넌트 문서</h1>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    경로는 <code className="rounded bg-black/5 px-1 py-0.5">display/typography</code>처럼{' '}
                    <code className="rounded bg-black/5 px-1 py-0.5">카테고리/컴포넌트</code>로 고정되어 있어요. 왼쪽에서 항목을 고르거나 아래에서 카테고리로
                    들어가세요.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((c) => (
                    <Link
                        key={c}
                        href={`/design-system/${c}`}
                        className="group rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <div className="text-sm font-semibold tracking-tight">{c}</div>
                                <div className="text-muted-foreground mt-1 text-xs">{`${c}/…`}</div>
                            </div>
                            <div className="text-muted-foreground text-sm transition group-hover:translate-x-0.5">→</div>
                        </div>
                    </Link>
                ))}
                <Link
                    href="/design-system/showcase"
                    className="group rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <div className="text-sm font-semibold tracking-tight">showcase</div>
                            <div className="text-muted-foreground mt-1 text-xs">stitch/...</div>
                        </div>
                        <div className="text-muted-foreground text-sm transition group-hover:translate-x-0.5">→</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};
