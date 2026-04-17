'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/design-system/lib/utils';

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;

export function SelectTrigger({ className, ...props }: SelectTriggerProps) {
    return (
        <SelectPrimitive.Trigger
            className={cn(
                'flex h-11 w-full items-center justify-between rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface',
                'hb-focus-ring-primary',
                className
            )}
            {...props}
        />
    );
}

type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

export function SelectContent({ className, children, ...props }: SelectContentProps) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                className={cn('rounded-lg border border-outline-variant bg-surface-container-lowest p-1 text-on-surface shadow-lg', className)}
                {...props}
            >
                <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

export function SelectItem({ className, children, ...props }: SelectItemProps) {
    return (
        <SelectPrimitive.Item
            className={cn(
                'relative flex h-9 cursor-default select-none items-center rounded-md px-2 text-sm outline-hidden',
                'hover:bg-surface-container-high focus:bg-surface-container-high data-[state=checked]:bg-surface-container',
                className
            )}
            {...props}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
}
