'use client';

export function ConfirmUsage() {
    return (
        <div className="space-y-3 text-sm leading-relaxed">
            <div className="rounded-xl border bg-white p-4">
                <div className="text-xs font-semibold tracking-wide">기본 패턴</div>
                <div className="text-muted-foreground mt-1">
                    <code className="rounded bg-black/5 px-1 py-0.5">useConfirm((s) =&gt; s.confirm)</code>로{' '}
                    <code className="rounded bg-black/5 px-1 py-0.5">confirm(name, data)</code>를 호출하고, 같은{' '}
                    <code className="rounded bg-black/5 px-1 py-0.5">name</code>의 <code className="rounded bg-black/5 px-1 py-0.5">Confirm</code>를 렌더링해두면 됩니다.
                </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
                <div className="text-xs font-semibold tracking-wide">data 전달</div>
                <div className="text-muted-foreground mt-1">
                    primitive는 <code className="rounded bg-black/5 px-1 py-0.5">data?: unknown</code>를 저장합니다. 필요하면{' '}
                    <code className="rounded bg-black/5 px-1 py-0.5">ConfirmContent</code>의 children을 함수로 만들어 data 기반 렌더도 가능합니다.
                </div>
            </div>
        </div>
    );
}

