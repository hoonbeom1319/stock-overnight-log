import type { ComponentType, SVGProps } from 'react';

import * as radixIcons from '@radix-ui/react-icons';

import { cn } from '@/design-system/lib/utils';

type IconName = keyof typeof radixIcons;
type RadixIconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type IconProps = SVGProps<SVGSVGElement> & {
    name: IconName;
    size?: number;
};

export function Icon({ name, className, size = 18, ...props }: IconProps) {
    const RadixIcon = radixIcons[name] as RadixIconComponent | undefined;

    if (!RadixIcon) {
        return null;
    }

    return (
        <RadixIcon
            width={size}
            height={size}
            className={cn('text-current', className)}
            {...props}
        />
    );
}
