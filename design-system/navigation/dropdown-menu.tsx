'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/design-system/lib/utils';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>;
type DropdownMenuItemProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>;
type DropdownMenuLabelProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>;
type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>;

export function DropdownMenuContent({ className, sideOffset = 8, ...props }: DropdownMenuContentProps) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                sideOffset={sideOffset}
                className={cn('z-50 min-w-44 rounded-xl bg-secondary p-1 text-white shadow-xl', className)}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    );
}

export function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
    return (
        <DropdownMenuPrimitive.Item
            className={cn(
                'relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-hidden',
                'focus:bg-secondary-400 focus:text-white data-disabled:pointer-events-none data-disabled:opacity-40',
                className
            )}
            {...props}
        />
    );
}

export function DropdownMenuLabel({ className, ...props }: DropdownMenuLabelProps) {
    return <DropdownMenuPrimitive.Label className={cn('px-2 py-1 text-xs font-semibold tracking-wide text-secondary-700', className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
    return <DropdownMenuPrimitive.Separator className={cn('my-1 h-px bg-secondary-400', className)} {...props} />;
}
