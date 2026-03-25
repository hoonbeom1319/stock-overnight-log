import { useMutation } from '@tanstack/react-query';

import { tradingLogMutations } from './factory';

export function useDeleteTradingLogMutation() {
    return useMutation(tradingLogMutations.delete());
}
