'use client';

import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/design-system/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
};

const variantClassName: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-200',
    secondary: 'bg-secondary text-white hover:bg-secondary-200',
    ghost: 'bg-transparent text-secondary-900 hover:bg-secondary-100'
};

const sizeClassName: Record<ButtonSize, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base'
};

export function Button({ asChild = false, className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            className={cn(
                'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
                'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none',
                'disabled:pointer-events-none disabled:opacity-50',
                variantClassName[variant],
                sizeClassName[size],
                className
            )}
            {...props}
        />
    );
}
