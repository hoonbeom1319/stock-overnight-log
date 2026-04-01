'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/design-system/lib/utils';

export const Tabs = TabsPrimitive.Root;

type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;
type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

export function TabsList({ className, ...props }: TabsListProps) {
    return <TabsPrimitive.List className={cn('inline-flex h-16 items-center gap-3 rounded-xl bg-secondary-100 p-2', className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
    return (
        <TabsPrimitive.Trigger
            className={cn(
                'inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm text-secondary-700',
                'data-[state=active]:bg-primary data-[state=active]:text-white',
                className
            )}
            {...props}
        />
    );
}

export function TabsContent({ className, ...props }: TabsContentProps) {
    return <TabsPrimitive.Content className={cn('mt-3', className)} {...props} />;
}
