import Link from 'next/link';

const categories = ['display', 'feedback', 'input', 'layout', 'navigation', 'surface'] as const;

export default function DesignSystemPage() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6">
                <div className="text-muted-foreground text-xs font-medium tracking-wide">DESIGN SYSTEM</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">컴포넌트 문서</h1>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    왼쪽 사이드바에서 컴포넌트를 선택하면 해당 라우트에서 소개/소스 코드를 확인할 수 있어요.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => (
                    <Link
                        key={c}
                        href={`/design-system/${c}`}
                        className="group rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <div className="text-sm font-semibold tracking-tight">{c}</div>
                                <div className="text-muted-foreground mt-1 text-xs">카테고리 페이지</div>
                            </div>
                            <div className="text-muted-foreground text-sm transition group-hover:translate-x-0.5">→</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
