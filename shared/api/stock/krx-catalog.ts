import { gunzipSync } from 'zlib';

const STOCK_MASTER_URL = 'https://github.com/FinanceData/stock_master/raw/master/stock_master.csv.gz';
const CACHE_TTL_MS = 1000 * 60 * 60 * 12;

interface KrxCatalogRow {
    code: string;
    name: string;
    market: 'KOSPI' | 'KOSDAQ';
    yahooSymbol: string;
}

let cache: { data: KrxCatalogRow[]; loadedAt: number } | null = null;
let loadingPromise: Promise<KrxCatalogRow[]> | null = null;

function normalizeText(value: string) {
    return value.replace(/\s+/g, '').toLowerCase();
}

function parseCsvLine(line: string) {
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let index = 0; index < line.length; index += 1) {
        const char = line[index];

        if (char === '"') {
            if (inQuotes && line[index + 1] === '"') {
                current += '"';
                index += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === ',' && !inQuotes) {
            fields.push(current);
            current = '';
            continue;
        }

        current += char;
    }

    fields.push(current);
    return fields;
}

async function loadCatalogRows() {
    if (cache && Date.now() - cache.loadedAt < CACHE_TTL_MS) {
        return cache.data;
    }

    if (loadingPromise) {
        return loadingPromise;
    }

    loadingPromise = (async () => {
        const response = await fetch(STOCK_MASTER_URL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`종목 마스터 로드 실패 (status: ${response.status})`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        const csv = gunzipSync(buffer).toString('utf-8');
        const lines = csv.split('\n').map((line) => line.trim()).filter(Boolean);
        const body = lines.slice(1);

        const parsedRows = body
            .map((line) => parseCsvLine(line))
            .filter((fields) => fields.length >= 4)
            .map((fields) => {
                const [symbol, name, market, listing] = fields;
                return {
                    symbol,
                    name,
                    market,
                    listing
                };
            })
            .filter((row) => row.listing === 'True' && (row.market === 'KOSPI' || row.market === 'KOSDAQ'))
            .map((row) => ({
                code: row.symbol,
                name: row.name,
                market: row.market as 'KOSPI' | 'KOSDAQ',
                yahooSymbol: `${row.symbol}.${row.market === 'KOSPI' ? 'KS' : 'KQ'}`
            }));

        cache = {
            data: parsedRows,
            loadedAt: Date.now()
        };

        loadingPromise = null;
        return parsedRows;
    })();

    return loadingPromise;
}

export interface StockSuggestion {
    code: string;
    name: string;
    market: 'KOSPI' | 'KOSDAQ';
    yahooSymbol: string;
}

export async function searchKrxStockSuggestions(keyword: string, limit = 8): Promise<StockSuggestion[]> {
    const trimmed = keyword.trim();
    if (!trimmed) return [];

    const normalizedQuery = normalizeText(trimmed);
    const catalog = await loadCatalogRows();
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
        .filter((value): value is { item: KrxCatalogRow; score: number } => Boolean(value))
        .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, 'ko-KR'))
        .slice(0, limit)
        .map(({ item }) => item);

    return scored;
}

export async function resolveKrxStockByInput(input: string): Promise<StockSuggestion | null> {
    const trimmed = input.trim();
    if (!trimmed) return null;

    const explicitCode = trimmed.match(/\b(\d{6})\b/)?.[1];
    const catalog = await loadCatalogRows();

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
