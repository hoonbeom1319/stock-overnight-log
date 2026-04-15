import type { ReactNode } from 'react';

type ComponentDocumentHeaderProps = {
    category: string;
    component: string;
    title: string;
    description?: ReactNode;
    filePath: string;
};

const ComponentDocument = ({ children }: { children: ReactNode }) => {
    return <div className="space-y-6">{children}</div>;
};

const ComponentDocumentHeader = ({ category, component, title, description, filePath }: ComponentDocumentHeaderProps) => {
    return (
        <div className="rounded-2xl border bg-white p-6">
            <div className="text-muted-foreground text-xs font-medium tracking-wide">{`${category}/${component}`}</div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{filePath}</p>
            <div className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</div>
        </div>
    );
};

const ComponentDocumentPlayground = ({ children }: { children: ReactNode }) => {
    return (
        <div className="rounded-2xl border bg-white">
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                <div className="text-sm font-semibold">Playground</div>
                <div className="text-muted-foreground text-xs">interactive</div>
            </div>
            <div className="p-4">{children}</div>
        </div>
    );
};

const ComponentDocumentUsage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="rounded-2xl border bg-white">
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                <div className="text-sm font-semibold">Usage</div>
                <div className="text-muted-foreground text-xs">guides</div>
            </div>
            <div className="p-4">{children}</div>
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
        <div className="rounded-2xl border bg-white">
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                <div className="text-sm font-semibold">Source</div>
                <div className="text-muted-foreground text-xs">읽기 전용</div>
            </div>
            <pre className="overflow-auto p-4 text-xs leading-relaxed">
                <code>{source}</code>
            </pre>
        </div>
    );
};

export { ComponentDocument, ComponentDocumentHeader, ComponentDocumentPlayground, ComponentDocumentUsage, ComponentDocumentSource };
