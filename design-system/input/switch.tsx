'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/design-system/lib/utils';

type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
    return (
        <SwitchPrimitive.Root
            className={cn(
                'relative inline-flex h-6 w-11 shrink-0 rounded-full bg-surface-container-high transition-colors',
                'data-[state=checked]:bg-primary',
                'hb-focus-ring-primary disabled:cursor-not-allowed disabled:opacity-60',
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    'pointer-events-none block size-5 rounded-full border border-outline-variant bg-surface-container-lowest shadow-sm transition-transform',
                    'translate-x-0.5 data-[state=checked]:translate-x-[22px]'
                )}
            />
        </SwitchPrimitive.Root>
    );
}
