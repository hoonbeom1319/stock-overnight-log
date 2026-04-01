'use client';

import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export const Portal = DialogPrimitive.Portal;

type PortalProviderProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export function PortalProvider(props: PortalProviderProps) {
    return <DialogPrimitive.Root {...props} />;
}
