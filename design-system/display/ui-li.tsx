import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/design-system/lib/utils';

type UlProps = PropsWithChildren<
    HTMLAttributes<HTMLUListElement> & {
        marker?: string;
        spacing?: 'sm' | 'md' | 'lg';
    }
>;

type LiProps = PropsWithChildren<HTMLAttributes<HTMLLIElement>>;

const spacingClassName = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3'
} as const;

export function Ul({ className, marker = '•', spacing = 'md', children, ...props }: UlProps) {
    return (
        <ul data-marker={marker} data-spacing={spacing} className={cn('space-y-1', className)} {...props}>
            {children}
        </ul>
    );
}

export function Li({ className, children, ...props }: LiProps) {
    return (
        <li className={cn('flex items-start', spacingClassName.md, className)} {...props}>
            <span aria-hidden>•</span>
            <span>{children}</span>
        </li>
    );
}
