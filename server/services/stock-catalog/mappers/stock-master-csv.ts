import 'server-only';

export type KrxCatalogRow = {
    code: string;
    name: string;
    market: 'KOSPI' | 'KOSDAQ';
    yahooSymbol: string;
};

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

export function toKrxCatalogRows(csv: string): KrxCatalogRow[] {
    const lines = csv
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    const body = lines.slice(1);

    return body
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
}
