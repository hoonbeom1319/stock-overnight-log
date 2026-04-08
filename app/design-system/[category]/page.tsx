import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { DesignSystemCategory } from '@/app/design-system/_server/nav';
import { getDesignSystemNav } from '@/app/design-system/_server/nav';

const allowed = new Set<DesignSystemCategory>(['display', 'feedback', 'input', 'layout', 'navigation', 'surface']);

type PageProps = { params: Promise<{ category: string }> };

export default async function DesignSystemCategoryPage({ params }: PageProps) {
    const { category } = await params;

    if (!allowed.has(category as DesignSystemCategory)) notFound();

    const nav = await getDesignSystemNav();
    const current = nav.find((n) => n.category === category);
    const components = current?.components ?? [];

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6">
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{category}</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">{category} components</h1>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    이 카테고리의 컴포넌트 목록이에요. (파일이 비어있거나 아직 없으면 “개발 예정”으로 남겨둡니다.)
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

