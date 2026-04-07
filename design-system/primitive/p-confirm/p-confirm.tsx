'use client';

import { MouseEventHandler, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';

import { Dialog, DialogClose, DialogContent, DialogTitle, DialogOverlay, DialogPortal } from '@radix-ui/react-dialog';

import { Icon } from '@/design-system/display/icon';

import { cn } from '../../lib/utils';
import { PButton } from '../p-button';

import { useConfirm, confirmContext, useConfirmContext } from './use-confirm';

type PButtonProps = PropsWithChildren<{ className?: string; name?: string; onClick?: MouseEventHandler<HTMLButtonElement>; asChild?: boolean }>;

export const PConfirm = ({ name, children }: PropsWithChildren<{ name: string }>) => {
    const t = useConfirm((s) => s.node[name]);
    const returnFocusToRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (t?.open) {
            returnFocusToRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        }
    }, [t?.open]);

    return (
        <confirmContext.Provider value={{ name, returnFocusToRef }}>
            <Dialog open={!!t?.open}>
                <DialogPortal>{children}</DialogPortal>
            </Dialog>
        </confirmContext.Provider>
    );
};

export const PConfirmOverlay = DialogOverlay;

export const PConfirmContent = ({ className, children }: { className?: string; children: ReactNode | ((data: unknown) => ReactNode) }) => {
    const { returnFocusToRef, name } = useConfirmContext();
    const t = useConfirm((s) => s.node[name]);
    const content = typeof children === 'function' ? children(t?.data ?? {}) : children;

    return (
        <DialogContent
            className={className}
            onCloseAutoFocus={(e) => {
                e.preventDefault();
                const target = returnFocusToRef?.current;
                if (!target) return;
                requestAnimationFrame(() => target.focus?.());
            }}
        >
            {content}
        </DialogContent>
    );
};

export const PConfirmTitle = ({ children, hidden, hideClose, className }: PropsWithChildren<{ className?: string; hidden?: boolean; hideClose?: boolean }>) => {
    const close = useConfirm((s) => s.close);
    const contextName = useConfirmContext().name;

    return (
        <div className={cn('flex w-full items-center justify-between', className)}>
            <DialogTitle hidden={hidden}>{children}</DialogTitle>
            {!hideClose && (
                <DialogClose asChild onClick={() => close(contextName)}>
                    <PButton className="min-h-none min-w-none ml-auto flex items-center justify-center">
                        <Icon name="Cross1Icon" />
                    </PButton>
                </DialogClose>
            )}
        </div>
    );
};

export const PConfirmButton = ({ className, name, children, onClick, asChild }: PButtonProps) => {
    const onConfirm = useConfirm((s) => s.onConfirm);
    const contextName = useConfirmContext().name;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onConfirm(name || contextName, true);
        onClick?.(e);
    };

    return (
        <PButton className={className} onClick={handleClick} asChild={asChild}>
            {children}
        </PButton>
    );
};

export const PCancelButton = ({ className, name, children, onClick, asChild }: PButtonProps) => {
    const onConfirm = useConfirm((s) => s.onConfirm);
    const contextName = useConfirmContext().name;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onConfirm(name || contextName, false);
        onClick?.(e);
    };

    return (
        <PButton className={className} onClick={handleClick} asChild={asChild}>
            {children}
        </PButton>
    );
};
