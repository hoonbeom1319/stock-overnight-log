import { ComponentProps } from 'react';

import { cn, tw } from '@/design-system/lib/utils';

import { PButton } from '../primitive';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ComponentProps<typeof PButton> & { variant?: ButtonVariant };

const buttonVariants: Record<ButtonVariant, string> = {
    primary: tw`bg-primary hover:bg-primary-200 active:bg-primary-100 text-white`,
    secondary: tw`bg-secondary hover:bg-secondary-200 active:bg-secondary-100 text-white`,
    ghost: tw`text-secondary-900 hover:bg-secondary-100 active:bg-secondary-200 bg-transparent`
};

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
    return (
        <PButton
            className={cn(
                'inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg px-2 py-1 transition-colors',
                'hb-focus-ring-primary',
                'disabled:pointer-events-none disabled:opacity-60',
                buttonVariants[variant],
                className
            )}
            {...props}
        />
    );
};

export { Button, buttonVariants };
