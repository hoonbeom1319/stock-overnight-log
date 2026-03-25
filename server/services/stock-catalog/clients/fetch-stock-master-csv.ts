import 'server-only';

import { FETCH } from '@/shared/api/fetch';

import type { KrxCatalogRow } from '../mappers/stock-master-csv';

const STOCK_MASTER_URL = 'https://apis.data.go.kr/1160100/service/GetKrxListedInfoService/getItemInfo';
const PAGE_SIZE = 9999;
const DATA_GO_REQUEST_TIMEOUT_MS = 8000;
/** Next.js Data Cache: 상장종목 마스터는 하루 1회만 원격 재검증 */
const STOCK_MASTER_REVALIDATE_SECONDS = 60 * 60 * 24;

type KrxListedItem = {
    srtnCd?: string;
    itmsNm?: string;
    mrktCtg?: string;
};

type KrxListedResponse = {
    response?: {
        header?: {
            resultCode?: string;
            resultMsg?: string;
        };
        body?: {
            items?: {
                item?: KrxListedItem[] | KrxListedItem;
            };
        };
    };
};

function normalizeMarket(value: string) {
    const upper = value.toUpperCase();
    if (upper.includes('KOSPI')) return 'KOSPI' as const;
    if (upper.includes('KOSDAQ')) return 'KOSDAQ' as const;
    return null;
}

function toArray<T>(value: T[] | T | undefined) {
    if (!value) return [] as T[];
    return Array.isArray(value) ? value : [value];
}

async function fetchWithTimeout(url: string, timeoutMs: number) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await FETCH(url, {
            signal: controller.signal,
            next: { revalidate: STOCK_MASTER_REVALIDATE_SECONDS }
        });
    } finally {
        clearTimeout(timer);
    }
}

export async function fetchStockMasterRows(): Promise<KrxCatalogRow[]> {
    const serviceKey = process.env.DATA_GO_KR_SERVICE_KEY?.trim();
    if (!serviceKey) {
        throw new Error('DATA_GO_KR_SERVICE_KEY 환경변수가 필요합니다.');
    }

    try {
        const searchParams = new URLSearchParams({
            serviceKey,
            resultType: 'json',
            numOfRows: String(PAGE_SIZE),
            pageNo: '1'
        });
        const response = await fetchWithTimeout(`${STOCK_MASTER_URL}?${searchParams.toString()}`, DATA_GO_REQUEST_TIMEOUT_MS);
        if (!response.ok) {
            throw new Error(`종목 마스터 로드 실패 (status: ${response.status})`);
        }

        const payload = (await response.json()) as KrxListedResponse;
        const resultCode = payload.response?.header?.resultCode ?? '99';
        if (resultCode !== '00') {
            const resultMsg = payload.response?.header?.resultMsg ?? '알 수 없는 오류';
            throw new Error(`KRX 상장종목 API 오류: ${resultMsg}`);
        }

        const items = toArray(payload.response?.body?.items?.item);
        const merged = new Map<string, KrxCatalogRow>();

        items.forEach((item) => {
            const code = item.srtnCd?.trim();
            const name = item.itmsNm?.trim();
            const market = normalizeMarket(item.mrktCtg?.trim() ?? '');
            if (!code || !name || !market) return;

            merged.set(code, {
                code,
                name,
                market,
                yahooSymbol: `${code}.${market === 'KOSPI' ? 'KS' : 'KQ'}`
            });
        });

        return Array.from(merged.values());
    } catch (error) {
        console.warn('[stock-catalog] data.go.kr load failed:', error);
        throw new Error('KRX 상장종목 API 호출에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
}
