'use client';

import type { InputHTMLAttributes } from 'react';

import { Icon } from '@/design-system/display/icon';
import { cn } from '@/design-system/lib/utils';

import { Input } from './input';

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function DatePicker({ className, ...props }: DatePickerProps) {
    return (
        <div className="relative">
            <Input
                type="date"
                className={cn(
                    'bg-surface-container-low pr-10 text-on-surface placeholder:text-on-surface-variant',
                    'scheme-light [&::-webkit-calendar-picker-indicator]:opacity-0',
                    className
                )}
                {...props}
            />
            <Icon
                name="CalendarIcon"
                size={16}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant"
                aria-hidden
            />
        </div>
    );
}
