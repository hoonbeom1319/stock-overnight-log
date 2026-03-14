import 'server-only';

export const SYMBOL_NOT_FOUND_MESSAGE = '종목을 찾지 못했습니다. 종목코드 6자리(예: 005930) 또는 코드+시장(005930.KS)로 입력해주세요.';
export const PREVIEW_NOT_FOUND_MESSAGE = '입력한 날짜 기준으로 시세를 찾지 못했습니다. 휴장일 여부를 확인해주세요.';

export class MarketPriceServiceError extends Error {
    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}
