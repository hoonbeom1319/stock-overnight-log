'use client';

import type { ComponentProps } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/design-system/lib/utils';

import { Icon } from '../display/icon';
import { PButton } from '../primitive';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) => {
    return <AccordionPrimitive.Item className={cn('bg-white', className)} {...props} />;
};

const AccordionTrigger = ({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) => {
    return (
        <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger {...props} asChild>
                <PButton
                    className={cn(
                        'group flex min-h-11 w-full items-center justify-between gap-2 px-2 text-left transition-[background-color,color] duration-200 ease-out',
                        'hb-focus-ring-primary',
                        'data-[state=open]:text-primary',
                        'hover:bg-secondary-950',
                        'active:bg-secondary-800',
                        className
                    )}
                >
                    <div className="min-w-0 flex-1">{children}</div>
                    <Icon
                        name="ChevronDownIcon"
                        className="text-secondary-500 group-data-[state=open]:text-primary shrink-0 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
                        aria-hidden
                    />
                </PButton>
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
};

const AccordionContent = ({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) => {
    return (
        <AccordionPrimitive.Content
            className={cn('data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up px-2', className)}
            {...props}
        >
            <div className="pt-2 pb-4">{children}</div>
        </AccordionPrimitive.Content>
    );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
