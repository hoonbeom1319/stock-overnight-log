'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/design-system/lib/utils';

export const Accordion = AccordionPrimitive.Root;

type AccordionItemProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;
type AccordionTriggerProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>;
type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;

export function AccordionItem({ className, ...props }: AccordionItemProps) {
    return <AccordionPrimitive.Item className={cn('rounded-lg bg-secondary-900 px-4', className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
    return (
        <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
                className={cn(
                    'flex h-12 w-full items-center justify-between text-left text-sm font-medium text-neutral-50',
                    'transition-all duration-300 ease-out data-[state=open]:text-primary',
                    className
                )}
                {...props}
            >
                {children}
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
    return (
        <AccordionPrimitive.Content
            className={cn(
                'overflow-hidden text-sm text-secondary-100',
                'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
                className
            )}
            {...props}
        >
            <div className="pb-4 pt-2">{children}</div>
        </AccordionPrimitive.Content>
    );
}
