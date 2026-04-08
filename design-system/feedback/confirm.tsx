import { ComponentProps, PropsWithChildren } from 'react';

import {
    PConfirm,
    PConfirmTitle,
    PConfirmButton,
    PCancelButton,
    PConfirmContent,
    PConfirmOverlay,
    useConfirm,
    DConfirmClose
} from '@/design-system/primitive/p-confirm';

import { Icon } from '../display/icon';
import { Button } from '../input/button';
import { cn } from '../lib/utils';
import { PButton } from '../primitive/p-button';

const Confirm = ({ name, children, className }: ComponentProps<typeof PConfirm> & { className?: string }) => {
    return (
        <PConfirm name={name}>
            <PConfirmOverlay className="fixed inset-0 bg-black/50" />
            <PConfirmContent className={cn('fixed top-1/2 left-1/2 min-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 pb-4', className)}>
                {children}
            </PConfirmContent>
        </PConfirm>
    );
};

const ConfirmTitle = ({ children, hidden, hideClose, className }: ComponentProps<typeof PConfirmTitle> & { hideClose?: boolean }) => {
    return (
        <div className={cn('flex w-full items-center justify-between py-4', hidden && hideClose && 'pt-0 pb-4', className)}>
            <PConfirmTitle hidden={hidden}>{children}</PConfirmTitle>
            {!hideClose && (
                <DConfirmClose asChild>
                    <PButton className="hb-focus-ring-primary min-h-none min-w-none ml-auto flex cursor-pointer items-center justify-center">
                        <Icon name="Cross1Icon" />
                    </PButton>
                </DConfirmClose>
            )}
        </div>
    );
};

const ConfirmBody = ({ children, className }: PropsWithChildren<{ className?: string }>) => <div className={cn('pb-4', className)}>{children}</div>;

const ConfirmButtonGroup = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <div className={cn('flex justify-end gap-2', className)}>{children}</div>
);

const ConfirmButton = ({ className, name, children, onClick }: ComponentProps<typeof PConfirmButton>) => {
    return (
        <PConfirmButton name={name} onClick={onClick} asChild>
            <Button className={className} variant="primary">
                {children}
            </Button>
        </PConfirmButton>
    );
};

const CancelButton = ({ className, name, children, onClick }: ComponentProps<typeof PCancelButton>) => {
    return (
        <PCancelButton name={name} onClick={onClick} asChild>
            <Button className={className} variant="outline">
                {children}
            </Button>
        </PCancelButton>
    );
};

export { useConfirm, Confirm, ConfirmTitle, ConfirmBody, ConfirmButtonGroup, ConfirmButton, CancelButton };
