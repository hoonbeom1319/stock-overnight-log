import type { LiHTMLAttributes, OlHTMLAttributes, PropsWithChildren } from 'react';

import { cn, tw } from '@/design-system/lib/utils';

type Direction = 'vertical' | 'horizontal';
type OlProps = PropsWithChildren<OlHTMLAttributes<HTMLOListElement> & { direction?: Direction }>;
type LiProps = PropsWithChildren<LiHTMLAttributes<HTMLLIElement> & { order: number }>;

const olVariants = {
    vertical: tw`space-y-3`,
    horizontal: tw`grid gap-4 md:grid-cols-3`
};

const Ol = ({ className, children, direction = 'vertical', ...props }: OlProps) => (
    <ol data-state={direction} className={cn('group', olVariants[direction], className)} {...props}>
        {children}
    </ol>
);

const Li = ({ className, order, children, ...props }: LiProps) => (
    <li
        className={cn(
            'flex items-start gap-3 leading-relaxed text-on-surface',
            'group-data-[state=horizontal]:block group-data-[state=horizontal]:rounded-xl group-data-[state=horizontal]:border group-data-[state=horizontal]:border-slate-200 group-data-[state=horizontal]:bg-white group-data-[state=horizontal]:p-4',
            className
        )}
        {...props}
    >
        <span className="flex h-[1.625em] shrink-0 items-center group-data-[state=horizontal]:h-auto" aria-hidden>
            <span
                className={cn(
                    'inline-flex size-[1.6em] shrink-0 translate-y-[0.05em] items-center justify-center rounded-full bg-primary/10 text-[0.875em] leading-none font-bold text-primary tabular-nums'
                )}
            >
                {order}
            </span>
        </span>

        <span className={cn('block leading-relaxed', 'group-data-[state=horizontal]:mt-2 group-data-[state=horizontal]:text-slate-600')}>{children}</span>
    </li>
);

export { Ol, Li, olVariants };
