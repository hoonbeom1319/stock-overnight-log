'use client';

import * as React from 'react';

import { cn } from '@/design-system/lib/utils';

type PrimitiveTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, PrimitiveTextAreaProps>(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={cn(
                'min-h-24 w-full rounded-lg px-3 py-2 text-sm transition-colors',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-60',
                'aria-invalid:ring-danger aria-invalid:ring-offset-0',
                className
            )}
            {...props}
        />
    );
});

TextArea.displayName = 'PrimitiveTextArea';

export { TextArea };
