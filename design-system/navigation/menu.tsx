'use client';

import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/design-system/lib/utils';

export const Menu = DialogPrimitive.Root;
export const MenuTrigger = DialogPrimitive.Trigger;
export const MenuClose = DialogPrimitive.Close;

export function MenuContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
    return (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 bg-neutral-900/25 backdrop-blur-[2px]" />
            <DialogPrimitive.Content
                className={cn(
                    'fixed bottom-0 left-0 top-0 w-[85%] rounded-r-2xl bg-primary/85 p-4 text-white backdrop-blur-[20px] shadow-[0px_20px_50px_rgba(43,52,55,0.06)]',
                    className
                )}
                {...props}
            >
                {children}
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    );
}
