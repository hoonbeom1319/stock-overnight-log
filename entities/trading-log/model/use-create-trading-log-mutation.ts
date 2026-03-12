import { useMutation } from '@tanstack/react-query';

import { tradingLogMutations } from '@/entities/trading-log/model/factory';

export function useCreateTradingLogMutation() {
    return useMutation(tradingLogMutations.create());
}
