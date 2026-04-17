import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/design-system/lib/utils';

type UlProps = PropsWithChildren<HTMLAttributes<HTMLUListElement>>;
type LiProps = PropsWithChildren<
    HTMLAttributes<HTMLLIElement> & {
        markerClassName?: string;
    }
>;

const Ul = ({ className, children, ...props }: UlProps) => (
    <ul className={cn('space-y-3', className)} {...props}>
        {children}
    </ul>
);

const Li = ({ className, markerClassName, children, ...props }: LiProps) => (
    <li className={cn('flex items-start gap-3 leading-relaxed text-on-surface', className)} {...props}>
        <span className={cn('mt-[0.75em] size-1.5 shrink-0 -translate-y-1/2 rounded-full bg-primary', markerClassName)} aria-hidden />
        <span>{children}</span>
    </li>
);

export { Ul, Li };
