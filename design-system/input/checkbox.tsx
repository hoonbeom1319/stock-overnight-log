'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { Icon } from '@/design-system/display/icon';
import { cn } from '@/design-system/lib/utils';

type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
    return (
        <CheckboxPrimitive.Root
            className={cn(
                'inline-flex size-5 items-center justify-center rounded-md border border-outline-variant bg-surface-container-high text-primary transition-colors',
                'data-[state=checked]:border-primary data-[state=checked]:bg-primary-fixed',
                'hb-focus-ring-primary disabled:cursor-not-allowed disabled:opacity-60',
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator>
                <Icon name="CheckIcon" size={14} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}
