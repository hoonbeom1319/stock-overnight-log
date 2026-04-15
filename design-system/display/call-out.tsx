import type { HTMLAttributes, ReactNode } from 'react';

import { cn, tw } from '@/design-system/lib/utils';

type CallOutVariant = 'info' | 'success' | 'warning' | 'danger';

type CallOutProps = HTMLAttributes<HTMLDivElement> & {
    variant?: CallOutVariant;
    title?: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
};

const CallOutVariants = {
    info: tw`border-info-300 bg-info-950 text-info-100`,
    success: tw`border-success-300 bg-success-950 text-success-100`,
    warning: tw`border-warning-300 bg-warning-950 text-warning-100`,
    danger: tw`border-danger-300 bg-danger-950 text-danger-100`
};

const CallOut = ({ className, variant = 'info', title, description, icon, action, children, ...props }: CallOutProps) => {
    return (
        <div className={cn('rounded-xl border p-4', CallOutVariants[variant], className)} {...props}>
            <div className="flex items-start gap-3">
                {icon && <div className="shrink-0 pt-0.5">{icon}</div>}
                <div className="min-w-0 flex-1 space-y-1">
                    {title && <CallOutTitle>{title}</CallOutTitle>}
                    {description && <CallOutDescription>{description}</CallOutDescription>}
                    {children}
                </div>
                {action && <div className="shrink-0">{action}</div>}
            </div>
        </div>
    );
};

const CallOutTitle = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
    return <p className={cn('text-sm leading-5 font-semibold', className)} {...props} />;
};

const CallOutDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
    return <p className={cn('text-sm leading-6 opacity-90', className)} {...props} />;
};

export { CallOut, CallOutDescription, CallOutTitle, CallOutVariants };
