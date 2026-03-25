import { useMutation } from '@tanstack/react-query';

import { tradingLogMutations } from './factory';

export function useCreateTradingLogMutation() {
    return useMutation(tradingLogMutations.create());
}
