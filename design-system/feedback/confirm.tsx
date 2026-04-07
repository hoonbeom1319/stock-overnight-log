import { ComponentProps, PropsWithChildren } from 'react';

import { PConfirm, PConfirmTitle, PConfirmButton, PCancelButton, PConfirmContent, PConfirmOverlay, useConfirm } from '@/design-system/primitive/p-confirm';

import { Button } from '../input/button';
import { cn } from '../lib/utils';

const Confirm = ({ name, children, className }: ComponentProps<typeof PConfirm> & { className?: string }) => {
    return (
        <PConfirm name={name}>
            <PConfirmOverlay />
            <PConfirmContent className={cn('fixed top-1/2 left-1/2 min-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded bg-white px-4 pb-4', className)}>
                {children}
            </PConfirmContent>
        </PConfirm>
    );
};

const ConfirmTitle = ({ children, hidden, hideClose, className }: ComponentProps<typeof PConfirmTitle>) => {
    return (
        <PConfirmTitle className={cn('py-4', hidden && hideClose && 'pt-0 pb-4', className)} hidden={hidden} hideClose={hideClose}>
            {children}
        </PConfirmTitle>
    );
};

const ConfirmBody = ({ children, className }: PropsWithChildren<{ className?: string }>) => <div className={cn('pb-4', className)}>{children}</div>;

const ConfirmButtonGroup = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <div className={cn('flex justify-end gap-2', className)}>{children}</div>
);

const ConfirmButton = ({ className, name, children, onClick }: ComponentProps<typeof PConfirmButton>) => {
    return (
        <PConfirmButton name={name} onClick={onClick} asChild>
            <Button className={className}>{children}</Button>
        </PConfirmButton>
    );
};

const CancelButton = ({ className, name, children, onClick }: ComponentProps<typeof PCancelButton>) => {
    return (
        <PCancelButton name={name} onClick={onClick} asChild>
            <Button className={className} variant="secondary">
                {children}
            </Button>
        </PCancelButton>
    );
};

export { useConfirm, Confirm, ConfirmTitle, ConfirmBody, ConfirmButtonGroup, ConfirmButton, CancelButton };
