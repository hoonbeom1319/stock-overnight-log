'use client';

import type { ComponentProps } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/design-system/lib/utils';

import { Icon } from '../display/icon';
import * as ButtonPrimitive from '../primitive/button';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) => {
    return <AccordionPrimitive.Item className={cn('rounded-lg border bg-white', className)} {...props} />;
};

const AccordionTrigger = ({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) => {
    return (
        <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger {...props} asChild>
                <ButtonPrimitive.Button
                    className={cn(
                        'group flex min-h-11 w-full items-center justify-between gap-2 px-2 text-left',
                        'hb-focus-ring-primary',
                        'data-[state=open]:text-primary',
                        'hover:brightness-110',
                        'active:brightness-95',
                        className
                    )}
                >
                    <div className="min-w-0 flex-1">{children}</div>
                    <Icon
                        name="ChevronDownIcon"
                        className="group-data-[state=open]:text-primary shrink-0 transition-transform group-data-[state=open]:rotate-180"
                        aria-hidden
                    />
                </ButtonPrimitive.Button>
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
};

const AccordionContent = ({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) => {
    return (
        <AccordionPrimitive.Content
            className={cn('data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden border-t p-2', className)}
            {...props}
        >
            {children}
        </AccordionPrimitive.Content>
    );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
