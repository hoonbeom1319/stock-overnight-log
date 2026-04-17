'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

import { cn } from '@/design-system/lib/utils';

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

type ContextMenuContentProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>;
type ContextMenuItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>;

export function ContextMenuContent({ className, ...props }: ContextMenuContentProps) {
    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content className={cn('z-50 min-w-48 rounded-xl bg-secondary p-1 text-white shadow-xl', className)} {...props} />
        </ContextMenuPrimitive.Portal>
    );
}

export function ContextMenuItem({ className, ...props }: ContextMenuItemProps) {
    return (
        <ContextMenuPrimitive.Item
            className={cn(
                'relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-hidden',
                'focus:bg-secondary-400 focus:text-white data-disabled:pointer-events-none data-disabled:opacity-40',
                className
            )}
            {...props}
        />
    );
}
