import * as React from 'react';

import { cn } from '@/design-system/lib/utils';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
    return <div className={cn('mx-auto w-full max-w-screen-sm px-4', className)} {...props} />;
}
