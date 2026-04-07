'use client';

import type { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/design-system/lib/utils';

type TypographyVariant =
    | 'title-50-R'
    | 'title-50-M'
    | 'title-50-B'
    | 'title-100-R'
    | 'title-100-M'
    | 'title-100-B'
    | 'subtitle-50-R'
    | 'subtitle-50-M'
    | 'subtitle-50-B'
    | 'subtitle-100-R'
    | 'subtitle-100-M'
    | 'subtitle-100-B'
    | 'body-50-R'
    | 'body-50-M'
    | 'body-50-B'
    | 'body-100-R'
    | 'body-100-M'
    | 'body-100-B'
    | 'label-50-R'
    | 'label-50-M'
    | 'label-50-B'
    | 'label-100-R'
    | 'label-100-M'
    | 'label-100-B'
    | 'button-50-R'
    | 'button-50-M'
    | 'button-50-B'
    | 'button-100-R'
    | 'button-100-M'
    | 'button-100-B';

type TypographyProps<T extends ElementType = 'p'> = {
    as?: T;
    variant: TypographyVariant;
    className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

const variantClassName: Record<TypographyVariant, string> = {
    'title-50-R': 'text-[1.5rem] leading-[1.2] font-normal',
    'title-50-M': 'text-[1.5rem] leading-[1.2] font-medium',
    'title-50-B': 'text-[1.5rem] leading-[1.2] font-bold',
    'title-100-R': 'text-[2rem] leading-[1.2] font-normal',
    'title-100-M': 'text-[2rem] leading-[1.2] font-medium',
    'title-100-B': 'text-[2rem] leading-[1.2] font-bold',
    'subtitle-50-R': 'text-[1.125rem] leading-[1.3] font-normal',
    'subtitle-50-M': 'text-[1.125rem] leading-[1.3] font-medium',
    'subtitle-50-B': 'text-[1.125rem] leading-[1.3] font-bold',
    'subtitle-100-R': 'text-[1.25rem] leading-[1.3] font-normal',
    'subtitle-100-M': 'text-[1.25rem] leading-[1.3] font-medium',
    'subtitle-100-B': 'text-[1.25rem] leading-[1.3] font-bold',
    'body-50-R': 'text-[0.875rem] leading-[1.5] font-normal',
    'body-50-M': 'text-[0.875rem] leading-[1.5] font-medium',
    'body-50-B': 'text-[0.875rem] leading-[1.5] font-bold',
    'body-100-R': 'text-[1rem] leading-[1.5] font-normal',
    'body-100-M': 'text-[1rem] leading-[1.5] font-medium',
    'body-100-B': 'text-[1rem] leading-[1.5] font-bold',
    'label-50-R': 'text-[0.75rem] leading-[1.4] font-normal tracking-[0.05em]',
    'label-50-M': 'text-[0.75rem] leading-[1.4] font-medium tracking-[0.05em]',
    'label-50-B': 'text-[0.75rem] leading-[1.4] font-bold tracking-[0.05em]',
    'label-100-R': 'text-[0.875rem] leading-[1.4] font-normal tracking-[0.05em]',
    'label-100-M': 'text-[0.875rem] leading-[1.4] font-medium tracking-[0.05em]',
    'label-100-B': 'text-[0.875rem] leading-[1.4] font-bold tracking-[0.05em]',
    'button-50-R': 'text-[0.875rem] leading-[1] font-normal',
    'button-50-M': 'text-[0.875rem] leading-[1] font-medium',
    'button-50-B': 'text-[0.875rem] leading-[1] font-bold',
    'button-100-R': 'text-[1rem] leading-[1] font-normal',
    'button-100-M': 'text-[1rem] leading-[1] font-medium',
    'button-100-B': 'text-[1rem] leading-[1] font-bold'
};

const Typography = <T extends ElementType = 'div'>({ as, variant, className, ...props }: TypographyProps<T>) => {
    const Comp = as ?? 'div';
    return <Comp className={cn(variantClassName[variant], className)} {...props} />;
};

export { Typography };
