'use client';

import { ComponentPropsWithoutRef } from 'react';

import { Label as RadixLabel } from 'radix-ui';

import { cn } from '../lib/utils/cn';

export function Label({ className, ...props }: ComponentPropsWithoutRef<typeof RadixLabel.Root>) {
    return <RadixLabel.Root className={cn('text-sm font-medium text-slate-300', className)} {...props} />;
}
