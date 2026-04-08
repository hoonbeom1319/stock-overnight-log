import { ComponentProps } from 'react';

import { cn, tw } from '@/design-system/lib/utils';

import { PButton } from '../primitive';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = ComponentProps<typeof PButton> & { variant?: ButtonVariant };

const buttonVariants: Record<ButtonVariant, string> = {
    primary: tw`bg-gradient-primary text-white`,
    secondary: tw`bg-gradient-secondary text-white`,
    outline: tw`border-primary-300 border bg-white`
};

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
    return (
        <PButton
            className={cn(
                'inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg px-2 py-1 transition duration-150 ease-out',
                'hover:brightness-110 active:translate-x-px active:translate-y-px active:brightness-95',
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
