import { promises as fs } from 'node:fs';
import path from 'node:path';

import { notFound } from 'next/navigation';

import { getDesignSystemDoc } from '@/app/design-system/_docs/registry';
import type { DesignSystemCategory } from '@/app/design-system/_server/nav';

const allowed = new Set<DesignSystemCategory>(['display', 'feedback', 'input', 'layout', 'navigation', 'surface']);

type PageProps = { params: Promise<{ category: string; component: string }> };

async function readSourceFile(category: string, component: string) {
    const root = process.cwd();
    const filePath = path.join(root, 'design-system', category, `${component}.tsx`);

    try {
        const text = await fs.readFile(filePath, 'utf8');
        return { ok: true as const, filePath: `design-system/${category}/${component}.tsx`, text };
    } catch {
        return { ok: false as const, filePath: `design-system/${category}/${component}.tsx`, text: '' };
    }
}

export default async function DesignSystemComponentPage({ params }: PageProps) {
    const { category, component } = await params;

    if (!allowed.has(category as DesignSystemCategory)) notFound();

    const docKey = `${category}/${component}`;
    const doc = await getDesignSystemDoc(docKey);
    const source = await readSourceFile(category, component);

    const Playground = doc?.Playground;
    const Usage = doc?.Usage;

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6">
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{category}</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">{doc?.title ?? component}</h1>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{source.filePath}</p>
                {doc?.description ? <div className="text-muted-foreground mt-3 text-sm leading-relaxed">{doc.description}</div> : null}
            </div>

            {Playground ? (
                <div className="rounded-2xl border bg-white">
                    <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                        <div className="text-sm font-semibold">Playground</div>
                        <div className="text-muted-foreground text-xs">interactive</div>
                    </div>
                    <div className="p-4">
                        <Playground />
                    </div>
                </div>
            ) : null}

            {Usage ? (
                <div className="rounded-2xl border bg-white">
                    <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                        <div className="text-sm font-semibold">Usage</div>
                        <div className="text-muted-foreground text-xs">guides</div>
                    </div>
                    <div className="p-4">
                        <Usage />
                    </div>
                </div>
            ) : null}

            {!doc && (!source.ok || source.text.trim().length === 0) ? (
                <div className="rounded-2xl border bg-white p-6">
                    <div className="text-sm font-semibold">개발 예정</div>
                    <div className="text-muted-foreground mt-2 text-sm">파일이 아직 없거나 내용이 비어있어요. 라우트는 미리 열어두었습니다.</div>
                </div>
            ) : (
                <div className="rounded-2xl border bg-white">
                    <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                        <div className="text-sm font-semibold">Source</div>
                        <div className="text-muted-foreground text-xs">읽기 전용</div>
                    </div>
                    <pre className="overflow-auto p-4 text-xs leading-relaxed">
                        <code>{source.text}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}
