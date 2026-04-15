'use client';

import { Confirm, ConfirmBody, ConfirmButtonGroup, ConfirmTitle, CancelButton, ConfirmButton } from '@/design-system/feedback/confirm';
import { Button } from '@/design-system/input/button';

import { useConfirmPlayground } from '../model/use-confirm-playground';

export const Playground = () => {
    const name = 'playground-confirm';
    const { open } = useConfirmPlayground(name);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Button onClick={open} variant="primary">
                    Confirm 열기
                </Button>
            </div>

            <Confirm name={name}>
                <ConfirmTitle>Title</ConfirmTitle>
                <ConfirmBody className="text-sm leading-relaxed text-black/80">Confirm Body</ConfirmBody>
                <ConfirmButtonGroup>
                    <CancelButton>취소</CancelButton>
                    <ConfirmButton>확인</ConfirmButton>
                </ConfirmButtonGroup>
            </Confirm>
        </div>
    );
};
