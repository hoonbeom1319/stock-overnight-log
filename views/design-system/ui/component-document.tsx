import type { ReactNode } from 'react';

type ComponentDocumentHeaderProps = {
    category: string;
    component: string;
    title: string;
    description?: ReactNode;
    filePath: string;
};

const ComponentDocument = ({ children }: { children: ReactNode }) => {
    return <div className="mx-auto max-w-5xl space-y-6">{children}</div>;
};

const ComponentDocumentHeader = ({ category, component, title, description, filePath }: ComponentDocumentHeaderProps) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="text-xs font-semibold tracking-[0.12em] text-indigo-600 uppercase">{`${category}/${component}`}</div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{filePath}</p>
            <div className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">{description}</div>
        </div>
    );
};

const ComponentDocumentPlayground = ({ children }: { children: ReactNode }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3">
                <div className="text-sm font-semibold text-slate-900">Playground</div>
                <div className="text-xs font-medium text-slate-500">interactive</div>
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
};

const ComponentDocumentUsage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3">
                <div className="text-sm font-semibold text-slate-900">Usage</div>
                <div className="text-xs font-medium text-slate-500">guides</div>
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
};

const ComponentDocumentSource = ({ source }: { source?: string }) => {
    if (!source)
        return (
            <div className="rounded-2xl border bg-white p-6">
                <div className="text-sm font-semibold">개발 예정</div>
                <div className="text-muted-foreground mt-2 text-sm">파일이 아직 없거나 내용이 비어있어요. 라우트는 미리 열어두었습니다.</div>
            </div>
        );

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3">
                <div className="text-sm font-semibold text-slate-900">Source</div>
                <div className="text-xs font-medium text-slate-500">read-only</div>
            </div>
            <pre className="max-h-[480px] overflow-auto bg-slate-950 p-5 text-xs leading-relaxed text-slate-100">
                <code className="font-mono">{source}</code>
            </pre>
        </div>
    );
};

export { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentUsage, ComponentDocumentSource };
