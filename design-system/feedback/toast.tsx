import type { ComponentProps, HTMLAttributes } from 'react';

import { cn } from '@/design-system/lib/utils';
import * as ToastPrimitive from '@/design-system/primitive/toast';

const toastVariants = {
    success: { border: 'border-success-400', iconWrap: 'bg-success-900', icon: 'text-success' },
    info: { border: 'border-info-400', iconWrap: 'bg-info-900', icon: 'text-info' },
    error: { border: 'border-danger-400', iconWrap: 'bg-danger-900', icon: 'text-danger' }
} as const;

type ToastVariant = keyof typeof toastVariants;

type ToastProps = ComponentProps<typeof ToastPrimitive.Toast> & {
    variant?: ToastVariant;
};

type ToastIconProps = HTMLAttributes<HTMLSpanElement> & { variant?: ToastVariant };
const ToastProvider = ToastPrimitive.ToastProvider;

const ToastViewport = ({ className, ...props }: ComponentProps<typeof ToastPrimitive.ToastViewport>) => {
    return <ToastPrimitive.ToastViewport className={cn('fixed right-0 bottom-0 z-toast m-0 max-w-dvw list-none p-4 outline-none', className)} {...props} />;
};

const Toast = ({ className, variant = 'info', ...props }: ToastProps) => {
    return (
        <ToastPrimitive.Toast
            forceMount
            className={cn(
                'group pointer-events-auto flex items-start gap-4 rounded-lg border border-l-4 border-slate-200 bg-slate-50 p-4 shadow-sm transition',
                'data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
                'data-[state=open]:translate-x-0 data-[state=open]:translate-y-0',
                'data-[state=closed]:data-[swipe-direction=right]:translate-x-[110%]',
                'data-[state=closed]:data-[swipe-direction=left]:-translate-x-[110%]',
                'data-[state=closed]:data-[swipe-direction=up]:-translate-y-[110%]',
                'data-[state=closed]:data-[swipe-direction=down]:translate-y-[110%]',
                'data-[swipe=move]:data-[swipe-direction=right]:translate-x-(--radix-toast-swipe-move-x)',
                'data-[swipe=move]:data-[swipe-direction=left]:translate-x-(--radix-toast-swipe-move-x)',
                'data-[swipe=move]:data-[swipe-direction=up]:translate-y-(--radix-toast-swipe-move-y)',
                'data-[swipe=move]:data-[swipe-direction=down]:translate-y-(--radix-toast-swipe-move-y)',
                'data-[swipe=cancel]:data-[swipe-direction=left]:translate-x-0 data-[swipe=cancel]:data-[swipe-direction=right]:translate-x-0',
                'data-[swipe=cancel]:data-[swipe-direction=down]:translate-y-0 data-[swipe=cancel]:data-[swipe-direction=up]:translate-y-0',
                'data-[swipe=end]:data-[swipe-direction=right]:translate-x-(--radix-toast-swipe-end-x)',
                'data-[swipe=end]:data-[swipe-direction=left]:translate-x-(--radix-toast-swipe-end-x)',
                'data-[swipe=end]:data-[swipe-direction=up]:translate-y-(--radix-toast-swipe-end-y)',
                'data-[swipe=end]:data-[swipe-direction=down]:translate-y-(--radix-toast-swipe-end-y)',
                'data-[swipe=end]:opacity-0',
                toastVariants[variant].border,
                className
            )}
            {...props}
        />
    );
};

const ToastIcon = ({ className, variant = 'info', children, ...props }: ToastIconProps) => {
    return (
        <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full', toastVariants[variant].iconWrap)} {...props}>
            <span className={cn('inline-flex', toastVariants[variant].icon, className)} aria-hidden>
                {children}
            </span>
        </div>
    );
};

const ToastContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn('min-w-0 flex-1 space-y-1', className)} {...props} />;
};

const ToastTitle = ({ className, ...props }: ComponentProps<typeof ToastPrimitive.ToastTitle>) => {
    return <ToastPrimitive.ToastTitle className={cn('text-sm font-semibold text-slate-900', className)} {...props} />;
};

const ToastDescription = ({ className, ...props }: ComponentProps<typeof ToastPrimitive.ToastDescription>) => {
    return <ToastPrimitive.ToastDescription className={cn('text-xs leading-relaxed text-slate-600', className)} {...props} />;
};

const ToastAction = ({ className, ...props }: ComponentProps<typeof ToastPrimitive.ToastAction>) => {
    return (
        <ToastPrimitive.ToastAction
            className={cn(
                'inline-flex h-8 items-center justify-center rounded-md bg-danger-900 px-3 text-[11px] font-bold text-danger-300 transition hover:brightness-95',
                'hb-focus-ring-primary',
                className
            )}
            {...props}
        />
    );
};

const ToastCloseButton = ({ className, ...props }: ComponentProps<typeof ToastPrimitive.ToastClose>) => {
    return (
        <ToastPrimitive.ToastClose
            className={cn(
                'inline-flex size-7 items-center justify-center rounded-md text-slate-500 opacity-0 transition group-hover:opacity-100 hover:bg-slate-200',
                'hb-focus-ring-primary',
                className
            )}
            aria-label="close"
            {...props}
        />
    );
};

export { ToastProvider, ToastViewport, Toast, ToastIcon, ToastContent, ToastTitle, ToastDescription, ToastAction, ToastCloseButton, toastVariants };
