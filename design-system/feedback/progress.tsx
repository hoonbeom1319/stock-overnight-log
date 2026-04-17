import type { HTMLAttributes } from 'react';

import { getRatio } from '@/design-system/lib/number';
import { cn } from '@/design-system/lib/utils';
import * as ProgressPrimitive from '@/design-system/primitive/progress';
import { VisuallyHidden } from '@/design-system/primitive/visually-hidden';

type LinearProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    value?: number;
    max?: number;
    indeterminate?: boolean;
    trackClassName?: string;
    indicatorClassName?: string;
};

type CircularProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
};

type CircularSpinnerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    size?: number;
    strokeWidth?: number;
};

const LinearProgress = ({ className, value = 0, max = 100, indeterminate = false, trackClassName, indicatorClassName, ...props }: LinearProgressProps) => {
    const ratio = getRatio(value, max);
    const percent = Math.round(ratio * 100);
    const widthStyle = { width: `${percent}%` };

    return (
        <ProgressPrimitive.LinearProgress
            className={cn('relative h-2 w-full overflow-hidden rounded-full bg-surface-container-highest', className, trackClassName)}
            max={max}
            now={percent}
            indeterminate={indeterminate}
            {...props}
        >
            {indeterminate ? (
                <span className={cn('absolute inset-y-0 left-0 w-full rounded-full bg-primary', 'animate-pulse', indicatorClassName)} aria-hidden />
            ) : (
                <span
                    className={cn('block h-full rounded-full bg-primary transition-[width] duration-500', indicatorClassName)}
                    style={widthStyle}
                    aria-hidden
                />
            )}
            <VisuallyHidden>{indeterminate ? '로딩 중' : `진행률 ${percent}%`}</VisuallyHidden>
        </ProgressPrimitive.LinearProgress>
    );
};

const CircularProgress = ({ className, value, max = 100, size = 64, strokeWidth = 6, ...props }: CircularProgressProps) => {
    const ratio = getRatio(value, max);
    const percent = Math.round(ratio * 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - circumference * ratio;

    return (
        <ProgressPrimitive.CircularProgress
            className={cn('relative inline-flex items-center justify-center', className)}
            now={percent}
            max={max}
            size={size}
            {...props}
        >
            <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
                <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} className="fill-transparent stroke-surface-container-highest" />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="fill-transparent stroke-primary transition-[stroke-dashoffset] duration-500"
                />
            </svg>
            <span className="absolute text-[10px] font-bold text-on-surface">{percent}%</span>
            <VisuallyHidden>진행률 {percent}%</VisuallyHidden>
        </ProgressPrimitive.CircularProgress>
    );
};

const CircularSpinner = ({ className, size = 64, strokeWidth = 6, ...props }: CircularSpinnerProps) => {
    const radius = (size - strokeWidth) / 2;

    return (
        <ProgressPrimitive.CircularSpinner
            className={cn('inline-flex items-center justify-center', className)}
            size={size}
            {...props}
        >
            <svg className="size-full animate-spin" viewBox={`0 0 ${size} ${size}`} aria-hidden>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${radius * 1.4} ${radius * 4.8}`}
                    className="fill-transparent stroke-primary"
                />
            </svg>
            <VisuallyHidden>로딩 중</VisuallyHidden>
        </ProgressPrimitive.CircularSpinner>
    );
};

export { LinearProgress, CircularProgress, CircularSpinner };
