export const Usage = () => {
    return (
        <div className="space-y-3 text-sm leading-relaxed">
            <div className="rounded-xl border bg-white p-4">
                <div className="text-xs font-semibold tracking-wide">기본 패턴</div>
                <div className="text-muted-foreground mt-1">
                    루트에 <code className="rounded bg-black/5 px-1 py-0.5">type</code>을 지정하고, 각{' '}
                    <code className="rounded bg-black/5 px-1 py-0.5">AccordionItem</code>에 고유{' '}
                    <code className="rounded bg-black/5 px-1 py-0.5">value</code>를 부여해 상태를 관리합니다.
                </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
                <div className="text-xs font-semibold tracking-wide">접근성/상호작용</div>
                <div className="text-muted-foreground mt-1">
                    트리거는 버튼 기반으로 키보드 탐색이 가능하며, 열림 상태에서는 아이콘이 회전해 현재 상태를 직관적으로 보여줍니다.
                </div>
            </div>
        </div>
    );
};
