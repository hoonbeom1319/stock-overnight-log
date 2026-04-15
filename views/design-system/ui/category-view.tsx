import Link from 'next/link';

type CategoryViewProps = { category: string; components: string[] };

export function CategoryView({ category, components }: CategoryViewProps) {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6">
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{category}</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">{category} components</h1>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    경로는 <code className="rounded bg-black/5 px-1 py-0.5">{category}/&lt;컴포넌트&gt;</code> 형식이에요.
                </p>
            </div>

            {components.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {components.map((name) => (
                        <Link
                            key={name}
                            href={`/design-system/${category}/${name}`}
                            className="group rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold tracking-tight">{name}</div>
                                    <div className="text-muted-foreground mt-1 text-xs">{`design-system/${category}/${name}.tsx`}</div>
                                </div>
                                <div className="text-muted-foreground text-sm transition group-hover:translate-x-0.5">→</div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border bg-white p-6">
                    <div className="text-sm font-semibold">개발 예정</div>
                    <div className="text-muted-foreground mt-2 text-sm">아직 이 카테고리에 노출할 컴포넌트 파일이 없어요.</div>
                </div>
            )}
        </div>
    );
}
