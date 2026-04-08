'use client';

import { useMemo, useState } from 'react';

import { Confirm, ConfirmBody, ConfirmButton, ConfirmButtonGroup, ConfirmTitle, CancelButton, useConfirm } from '@/design-system/feedback/confirm';
import { Button } from '@/design-system/input/button';

type ConfirmPayload = { title: string; body: string };

export function ConfirmPlayground() {
    const confirm = useConfirm((s) => s.confirm);
    const close = useConfirm((s) => s.close);
    const [lastResult, setLastResult] = useState<null | boolean>(null);

    const payload = useMemo<ConfirmPayload>(
        () => ({
            title: '정말 삭제할까요?',
            body: '이 작업은 되돌릴 수 없어요.'
        }),
        []
    );

    const handleOpen = async () => {
        const ok = await confirm('ds-confirm', payload);
        setLastResult(ok);
        close('ds-confirm');
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Button onClick={handleOpen} variant="primary">
                    Confirm 열기
                </Button>
                <div className="text-muted-foreground text-sm">
                    결과: <span className="text-black">{lastResult === null ? '—' : lastResult ? '확인(true)' : '취소(false)'}</span>
                </div>
            </div>

            <Confirm name="ds-confirm" className="min-w-[min(520px,calc(100vw-2rem))]">
                <ConfirmTitle>{payload.title}</ConfirmTitle>
                <ConfirmBody className="text-sm leading-relaxed text-black/80">{payload.body}</ConfirmBody>
                <ConfirmButtonGroup>
                    <CancelButton name="ds-confirm">취소</CancelButton>
                    <ConfirmButton name="ds-confirm">확인</ConfirmButton>
                </ConfirmButtonGroup>
            </Confirm>
        </div>
    );
}
