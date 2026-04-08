'use client';

import * as React from 'react';

import { cn } from '@/design-system/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn(
                'h-11 w-full rounded-lg bg-secondary-100 px-3 text-sm text-white',
                'placeholder:text-secondary-700',
                'hb-focus-ring-primary',
                className
            )}
            {...props}
        />
    );
}
