import { ComponentPropsWithoutRef } from 'react';

import { Primitive } from '@radix-ui/react-primitive';

import { cn } from '../lib/utils/cn';

export function Card({ className, ...props }: ComponentPropsWithoutRef<typeof Primitive.div>) {
    return (
        <Primitive.div
            className={cn('rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur', className)}
            {...props}
        />
    );
}
