import type { DesignSystemDocEntry } from '@/app/design-system/_docs/types';

import { ConfirmPlayground } from './confirm.playground';
import { ConfirmUsage } from './confirm.usage';

export const confirmDoc: DesignSystemDocEntry = {
    title: 'Confirm',
    description: 'Promise 기반 confirm(확인/취소) 다이얼로그.',
    Playground: ConfirmPlayground,
    Usage: ConfirmUsage
};

