import 'server-only';

import { fetchStockMasterCsv } from '@/server/services/stock-catalog/clients/fetch-stock-master-csv';
import type { KrxCatalogRow } from '@/server/services/stock-catalog/mappers/stock-master-csv';
import { toKrxCatalogRows } from '@/server/services/stock-catalog/mappers/stock-master-csv';

const CACHE_TTL_MS = 1000 * 60 * 60 * 12;

export type { KrxCatalogRow } from '@/server/services/stock-catalog/mappers/stock-master-csv';

let cache: { data: KrxCatalogRow[]; loadedAt: number } | null = null;
let loadingPromise: Promise<KrxCatalogRow[]> | null = null;

export async function getKrxCatalogRows() {
    if (cache && Date.now() - cache.loadedAt < CACHE_TTL_MS) {
        return cache.data;
    }

    if (loadingPromise) {
        return loadingPromise;
    }

    loadingPromise = (async () => {
        const csv = await fetchStockMasterCsv();
        const parsedRows = toKrxCatalogRows(csv);

        cache = {
            data: parsedRows,
            loadedAt: Date.now()
        };

        loadingPromise = null;
        return parsedRows;
    })();

    return loadingPromise;
}
