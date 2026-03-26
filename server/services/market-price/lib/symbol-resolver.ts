import 'server-only';

export function resolveSymbolsFromInput(stockInput: string): string[] {
    const trimmed = stockInput.trim();
    /**
     * 사용자가 종목 추천을 선택하면 `A036930`처럼 접두사가 포함될 수 있다.
     * 또한 `036930.KS`/`036930.KQ` 형태도 허용한다.
     */
    const explicitSymbolMatch = trimmed.match(/(?:^|[^\w])([A-Z]?\d{6})\.(KS|KQ)(?:$|[^\w])/i);
    if (explicitSymbolMatch) {
        const raw = explicitSymbolMatch[1] ?? '';
        const market = explicitSymbolMatch[2] ?? '';
        const code = raw.replace(/^[A-Z]/i, '');
        return [`${code}.${market}`.toUpperCase()];
    }

    const codeMatch = trimmed.match(/(?:^|[^\w])[A-Z]?(\d{6})(?:$|[^\w])/i)?.[1];
    if (!codeMatch) return [];

    return [`${codeMatch}.KS`, `${codeMatch}.KQ`];
}
