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
                'flex h-11 w-full items-center justify-between rounded-lg bg-secondary-100 px-3 text-sm text-white',
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
            <SelectPrimitive.Content className={cn('rounded-lg bg-secondary p-1 text-white shadow-lg', className)} {...props}>
                <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

export function SelectItem({ className, children, ...props }: SelectItemProps) {
    return (
        <SelectPrimitive.Item
            className={cn('relative flex h-9 cursor-default select-none items-center rounded-md px-2 text-sm outline-none hover:bg-secondary-400', className)}
            {...props}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
}
