import 'server-only';

export function resolveSymbolsFromInput(stockInput: string): string[] {
    const trimmed = stockInput.trim();
    const explicitSymbol = trimmed.match(/\b(\d{6}\.(KS|KQ))\b/i)?.[1];
    if (explicitSymbol) {
        return [explicitSymbol.toUpperCase()];
    }

    const codeMatch = trimmed.match(/\b(\d{6})\b/)?.[1];
    if (!codeMatch) return [];

    return [`${codeMatch}.KS`, `${codeMatch}.KQ`];
}
