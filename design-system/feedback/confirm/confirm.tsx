'use client';

import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';

import { Icon } from '@/design-system/display/icon';
import { Button } from '@/design-system/input/button';

import { cn } from '../../lib/utils';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '../dialog';

import { useConfirm, confirmContext, useConfirmContext } from './use-confirm';

type ConfirmProps = {
    className?: string;
    name: string;
    children: ReactNode | ((data: unknown) => ReactNode);
};

export const Confirm = ({ className, name, children }: ConfirmProps) => {
    const t = useConfirm((s) => s.node[name]);
    const close = useConfirm((s) => s.close);
    const content = typeof children === 'function' ? children(t?.data ?? {}) : children;
    const returnFocusToRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (t?.open) {
            returnFocusToRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        }
    }, [t?.open]);

    return (
        <confirmContext.Provider value={name}>
            <Dialog
                open={!!t?.open}
                onOpenChange={(nextOpen) => {
                    if (!nextOpen) close(name);
                }}
            >
                <DialogContent
                    className={cn('w-[480px] gap-0 px-4', className)}
                    onCloseAutoFocus={(e) => {
                        e.preventDefault();
                        const target = returnFocusToRef.current;
                        if (!target) return;
                        requestAnimationFrame(() => target.focus?.());
                    }}
                >
                    {content}
                </DialogContent>
            </Dialog>
        </confirmContext.Provider>
    );
};

export const ConfirmTitle = ({ children, hidden, hideClose, className }: PropsWithChildren<{ className?: string; hidden?: boolean; hideClose?: boolean }>) => {
    const close = useConfirm((s) => s.close);
    const contextName = useConfirmContext();

    return (
        <div className={cn('flex items-center justify-between', className)}>
            <DialogTitle hidden={hidden}>{children}</DialogTitle>
            {!hideClose && (
                <DialogClose className={cn('ml-auto')} onClick={() => close(contextName)}>
                    <Icon name="Cross1Icon" />
                </DialogClose>
            )}
        </div>
    );
};

export const ConfirmBody = ({ children, className }: PropsWithChildren<{ className?: string }>) => <div className={cn('pt-4', className)}>{children}</div>;

export const ConfirmButton = ({
    className,
    name,
    children,
    onClick
}: PropsWithChildren<{ className?: string; name?: string; variant?: 'fill-primary' | 'secondary'; onClick?: () => void }>) => {
    const onConfirm = useConfirm((s) => s.onConfirm);
    const contextName = useConfirmContext();

    return (
        <Button
            className={cn('h-11 min-w-[100px] rounded-lg px-2 focus:outline-none', className)}
            onClick={() => {
                onConfirm(name || contextName, true);
                onClick?.();
            }}
        >
            {children}
        </Button>
    );
};

export const CancelButton = ({
    className,
    name,
    children,
    onClick
}: PropsWithChildren<{ className?: string; name?: string; variant?: 'fill-primary' | 'secondary'; onClick?: () => void }>) => {
    const onConfirm = useConfirm((s) => s.onConfirm);
    const contextName = useConfirmContext();

    return (
        <Button
            className={cn('h-11 min-w-[100px] rounded-lg px-2 focus:outline-none', className)}
            onClick={() => {
                onConfirm(name || contextName, false);
                onClick?.();
            }}
        >
            {children}
        </Button>
    );
};
