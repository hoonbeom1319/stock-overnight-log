import 'server-only';

import { fetchStockMasterRows } from '../clients/fetch-stock-master-csv';
import type { KrxCatalogRow } from '../mappers/stock-master-csv';

/** 프로세스 메모리 캐시 (Next Data Cache와 별개). 상장 마스터는 하루 단위로 맞춤 */
const CACHE_TTL_MS = 1000 * 60 * 60 * 24;

export type { KrxCatalogRow } from '../mappers/stock-master-csv';

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
        try {
            const parsedRows = await fetchStockMasterRows();
            cache = {
                data: parsedRows,
                loadedAt: Date.now()
            };

            return parsedRows;
        } catch (error) {
            if (cache) {
                return cache.data;
            }

            // 카탈로그 소스 장애(인증키, 외부 API 오류) 시에도 서비스 전체가 500으로 죽지 않도록
            // 빈 카탈로그로 graceful fallback 한다.
            console.warn('[stock-catalog] fallback to empty catalog:', error);
            return [];
        } finally {
            loadingPromise = null;
        }
    })();

    return loadingPromise;
}
