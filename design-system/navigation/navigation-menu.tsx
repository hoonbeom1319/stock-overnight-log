'use client';

import type { ComponentPropsWithoutRef } from 'react';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

import { cn } from '@/design-system/lib/utils';

export const NavigationMenu = NavigationMenuPrimitive.Root;
export const NavigationMenuItem = NavigationMenuPrimitive.Item;

type NavigationMenuListProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>;
type NavigationMenuTriggerProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>;
type NavigationMenuContentProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>;
type NavigationMenuLinkProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>;

export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
    return <NavigationMenuPrimitive.List className={cn('flex items-center gap-2', className)} {...props} />;
}

export function NavigationMenuTrigger({ className, ...props }: NavigationMenuTriggerProps) {
    return (
        <NavigationMenuPrimitive.Trigger
            className={cn(
                'inline-flex h-10 items-center justify-center rounded-lg bg-secondary-100 px-3 text-sm font-medium text-white',
                'hb-focus-ring-primary data-[state=open]:bg-primary',
                className
            )}
            {...props}
        />
    );
}

export function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
    return <NavigationMenuPrimitive.Content className={cn('rounded-xl bg-secondary p-3 text-white shadow-xl', className)} {...props} />;
}

export function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
    return (
        <NavigationMenuPrimitive.Link
            className={cn('block rounded-lg px-3 py-2 text-sm outline-hidden hover:bg-secondary-400 focus:bg-secondary-400', className)}
            {...props}
        />
    );
}
