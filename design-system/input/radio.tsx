'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/design-system/lib/utils';

export const RadioGroup = RadioGroupPrimitive.Root;

type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
    return (
        <RadioGroupPrimitive.Item
            className={cn(
                'size-5 rounded-full border border-secondary-600 bg-secondary-100 text-primary transition-colors',
                'data-[state=checked]:border-primary data-[state=checked]:bg-primary-900',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="relative flex size-full items-center justify-center">
                <span className="size-2 rounded-full bg-primary" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
}
