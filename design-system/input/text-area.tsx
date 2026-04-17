'use client';

import * as React from 'react';

import { cn } from '@/design-system/lib/utils';
import { TextArea as PrimitiveTextArea } from '@/design-system/primitive/text-area';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className, ...props }: TextAreaProps) {
    return (
        <PrimitiveTextArea
            className={cn(
                'w-full rounded-xl bg-secondary-100 px-3 py-2 text-sm text-white',
                'placeholder:text-secondary-700',
                'hb-focus-ring-primary',
                className
            )}
            {...props}
        />
    );
}
