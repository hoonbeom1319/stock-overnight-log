'use client';

import { useConfirm } from '@/design-system/feedback/confirm';

export const useConfirmPlayground = (name: string) => {
    const confirm = useConfirm((s) => s.confirm);
    const closeAll = useConfirm((s) => s.closeAll);

    const open = async () => {
        await confirm(name);
        closeAll();
    };

    return { open };
};
