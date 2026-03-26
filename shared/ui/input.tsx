import { ComponentPropsWithoutRef } from 'react';

import { Primitive } from '@radix-ui/react-primitive';

import { cn } from '../lib/utils/cn';

export function Input({ className, ...props }: ComponentPropsWithoutRef<typeof Primitive.input>) {
    return (
        <Primitive.input
            className={cn(
                'h-11 w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 text-sm text-slate-100 transition outline-none',
                'placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        />
    );
}
