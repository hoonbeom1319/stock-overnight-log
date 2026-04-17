'use client';

import * as React from 'react';

import { cn } from '@/design-system/lib/utils';

type PrimitiveInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, PrimitiveInputProps>(({ className, type = 'text', ...props }, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            className={cn(
                'w-full rounded-lg px-3 py-2 text-sm transition-colors',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-60',
                'aria-invalid:ring-danger aria-invalid:ring-offset-0',
                className
            )}
            {...props}
        />
    );
});

Input.displayName = 'PrimitiveInput';

export { Input };
