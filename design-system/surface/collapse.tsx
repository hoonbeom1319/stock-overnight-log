'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { cn } from '@/design-system/lib/utils';

export const Collapse = CollapsiblePrimitive.Root;
export const CollapseTrigger = CollapsiblePrimitive.Trigger;

type CollapseContentProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;

export function CollapseContent({ className, ...props }: CollapseContentProps) {
    return <CollapsiblePrimitive.Content className={cn('data-[state=closed]:hidden data-[state=open]:block', className)} {...props} />;
}
