'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/design-system/lib/utils';

type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

export function Slider({ className, ...props }: SliderProps) {
    return (
        <SliderPrimitive.Root
            className={cn('relative flex h-5 w-full touch-none select-none items-center', className)}
            {...props}
        >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-container-highest">
                <SliderPrimitive.Range className="absolute h-full bg-primary" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
                className={cn(
                    'block size-5 rounded-full border border-outline-variant bg-surface-container-lowest shadow-sm transition',
                    'hb-focus-ring-primary disabled:pointer-events-none disabled:opacity-50'
                )}
            />
        </SliderPrimitive.Root>
    );
}
