function requestLabel(input: string | URL | globalThis.Request): string {
    if (typeof input === 'string') return input;
    if (input instanceof URL) return input.toString();
    if (input instanceof Request) return input.url;
    return String(input);
}

function tryFormatJson(text: string): string {
    const trimmed = text.trim();
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return text;
    try {
        return JSON.stringify(JSON.parse(trimmed), null, 2);
    } catch {
        return text;
    }
}

/** 공통 fetch 래퍼. 개발 환경에서 요청/응답 본문을 콘솔에 남깁니다. */
export const FETCH = async (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response> => {
    const isDEV = process.env.NODE_ENV === 'development';
    const label = requestLabel(input);
    const method = (
        init?.method ?? (input instanceof Request ? input.method : undefined) ?? 'GET'
    ).toUpperCase();

    try {
        const response = await fetch(input, init);

        if (isDEV) {
            const clone = response.clone();
            const rawText = await clone.text();
            const bodyForLog = rawText.length > 12_000 ? `${rawText.slice(0, 12_000)}\n… (truncated)` : tryFormatJson(rawText);

            console.groupCollapsed(`[FETCH] ${method} ${label} → ${response.status} ${response.statusText}`);

            if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
                console.log('request body:', init?.body);
            }

            console.log('response body:', bodyForLog || '(empty)');
            console.groupEnd();
        }

        return response;
    } catch (error) {
        let errorContents: string;

        if (error instanceof Error) {
            errorContents = `${error.name}: ${error.message}`;
        } else {
            errorContents = String(error ?? 'Unknown error');
        }

        if (isDEV) {
            console.error(`[FETCH] ${method} ${label} failed`, errorContents);
        }

        throw error;
    }
};
