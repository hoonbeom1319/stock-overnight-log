import { ComponentPropsWithoutRef } from 'react';

import { Primitive } from '@radix-ui/react-primitive';

import { cn } from '@/design-system/lib/utils';

type ButtonProps = ComponentPropsWithoutRef<typeof Primitive.button> & {
    variant?: 'primary' | 'secondary';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
    return (
        <Primitive.button
            className={cn(
                'inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60',
                variant === 'primary' && 'bg-sky-500 text-slate-950 hover:bg-sky-400',
                variant === 'secondary' && 'border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800',
                className
            )}
            {...props}
        />
    );
}
