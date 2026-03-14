import 'server-only';

import { getKrxCatalogRows } from '@/server/services/stock-catalog/repositories/krx-catalog-repository';

function normalizeText(value: string) {
    return value.replace(/\s+/g, '').toLowerCase();
}

export type KrxStockSuggestion = {
    code: string;
    name: string;
    market: 'KOSPI' | 'KOSDAQ';
    yahooSymbol: string;
};

export async function searchKrxStockSuggestions(keyword: string, limit = 8): Promise<KrxStockSuggestion[]> {
    const trimmed = keyword.trim();
    if (!trimmed) return [];

    const normalizedQuery = normalizeText(trimmed);
    const catalog = await getKrxCatalogRows();
    const isCodeQuery = /^\d+$/.test(trimmed);

    const scored = catalog
        .map((item) => {
            const normalizedName = normalizeText(item.name);

            if (isCodeQuery) {
                if (!item.code.includes(trimmed)) return null;
                const score = item.code.startsWith(trimmed) ? 100 : 60;
                return { item, score };
            }

            const includes = normalizedName.includes(normalizedQuery);
            if (!includes) return null;

            const score = normalizedName.startsWith(normalizedQuery) ? 100 : 70;
            return { item, score };
        })
        .filter((value): value is { item: KrxStockSuggestion; score: number } => Boolean(value))
        .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, 'ko-KR'))
        .slice(0, limit)
        .map(({ item }) => item);

    return scored;
}

export async function resolveKrxStockByInput(input: string): Promise<KrxStockSuggestion | null> {
    const trimmed = input.trim();
    if (!trimmed) return null;

    const explicitCode = trimmed.match(/\b(\d{6})\b/)?.[1];
    const catalog = await getKrxCatalogRows();

    if (explicitCode) {
        const byCode = catalog.find((item) => item.code === explicitCode);
        return byCode ?? null;
    }

    const normalizedInput = normalizeText(trimmed);
    const exact = catalog.find((item) => normalizeText(item.name) === normalizedInput);
    if (exact) return exact;

    const partial = catalog.find((item) => normalizeText(item.name).includes(normalizedInput));
    return partial ?? null;
}
