import type { ReactNode } from 'react';

import { Layout as DSLayout } from '@/views/design-system/ui';

export default function Layout({ children }: { children: ReactNode }) {
    return <DSLayout>{children}</DSLayout>;
}
