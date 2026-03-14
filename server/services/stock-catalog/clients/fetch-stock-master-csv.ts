import 'server-only';

import { gunzipSync } from 'zlib';

const STOCK_MASTER_URL = 'https://github.com/FinanceData/stock_master/raw/master/stock_master.csv.gz';

export async function fetchStockMasterCsv() {
    const response = await fetch(STOCK_MASTER_URL, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`종목 마스터 로드 실패 (status: ${response.status})`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return gunzipSync(buffer).toString('utf-8');
}
