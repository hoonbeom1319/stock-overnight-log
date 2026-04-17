'use client';

import type { HTMLAttributes, PropsWithChildren } from 'react';

type LinearProgressProps = PropsWithChildren<
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        min?: number;
        max?: number;
        now?: number;
        indeterminate?: boolean;
    }
>;

type CircularProgressProps = PropsWithChildren<
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        min?: number;
        max?: number;
        now: number;
        size?: number;
    }
>;

type CircularSpinnerProps = PropsWithChildren<
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        size?: number;
    }
>;

const LinearProgress = ({ className, min = 0, max = 100, now, indeterminate = false, children, ...props }: LinearProgressProps) => {
    return (
        <div role="progressbar" aria-valuemin={min} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : now} className={className} {...props}>
            {children}
        </div>
    );
};

const CircularProgress = ({ className, min = 0, max = 100, now, size = 64, children, ...props }: CircularProgressProps) => {
    return (
        <div
            role="progressbar"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={now}
            className={className}
            style={{ width: size, height: size }}
            {...props}
        >
            {children}
        </div>
    );
};

const CircularSpinner = ({ className, size = 64, children, ...props }: CircularSpinnerProps) => {
    return (
        <div role="status" className={className} style={{ width: size, height: size }} {...props}>
            {children}
        </div>
    );
};

export { LinearProgress, CircularProgress, CircularSpinner };
