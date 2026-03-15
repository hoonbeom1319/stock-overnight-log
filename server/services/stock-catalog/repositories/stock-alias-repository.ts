import 'server-only';

import { createClient } from '@supabase/supabase-js';

type StockAliasRow = {
    code: string;
    name_ko: string;
    market: 'KOSPI' | 'KOSDAQ';
    source: string;
};

export type StockAlias = {
    code: string;
    name: string;
    market: 'KOSPI' | 'KOSDAQ';
    source: string;
};

function normalizeText(value: string) {
    return value.replace(/\s+/g, '').toLowerCase();
}

function createPublicSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
    return createClient(supabaseUrl, supabaseAnonKey);
}

function toAlias(item: StockAliasRow): StockAlias {
    return {
        code: item.code,
        name: item.name_ko,
        market: item.market,
        source: item.source
    };
}

export async function searchStockAliases(keyword: string, limit = 8): Promise<StockAlias[]> {
    const trimmed = keyword.trim();
    if (!trimmed) return [];

    try {
        const supabase = createPublicSupabaseClient();
        const { data, error } = await supabase.from('stock_aliases').select('code,name_ko,market,source').limit(500);
        if (error || !data) return [];

        const normalizedQuery = normalizeText(trimmed);
        const tokens = trimmed.split(/\s+/).map(normalizeText).filter(Boolean);
        const isCodeQuery = /^\d+$/.test(trimmed);

        return (data as StockAliasRow[])
            .map((item) => {
                const normalizedName = normalizeText(item.name_ko);

                if (isCodeQuery) {
                    if (!item.code.includes(trimmed)) return null;
                    const score = item.code.startsWith(trimmed) ? 100 : 70;
                    return { item: toAlias(item), score };
                }

                const matchesCombined = `${normalizedName}${item.code}`.includes(normalizedQuery);
                const matchesTokens = tokens.every((token) => normalizedName.includes(token) || item.code.includes(token));
                if (!matchesCombined && !matchesTokens) return null;

                const score = normalizedName.startsWith(normalizedQuery) ? 100 : matchesTokens ? 85 : 70;
                return { item: toAlias(item), score };
            })
            .filter((value): value is { item: StockAlias; score: number } => Boolean(value))
            .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, 'ko-KR'))
            .slice(0, limit)
            .map(({ item }) => item);
    } catch {
        return [];
    }
}

export async function findStockAliasesByCodes(codes: string[]): Promise<Map<string, StockAlias>> {
    const uniqueCodes = [...new Set(codes.map((code) => code.trim()).filter((code) => /^\d{6}$/.test(code)))];
    if (!uniqueCodes.length) return new Map();

    try {
        const supabase = createPublicSupabaseClient();
        const { data, error } = await supabase.from('stock_aliases').select('code,name_ko,market,source').in('code', uniqueCodes);
        if (error || !data) return new Map();

        return new Map((data as StockAliasRow[]).map((item) => [item.code, toAlias(item)]));
    } catch {
        return new Map();
    }
}
