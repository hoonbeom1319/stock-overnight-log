export type StockSuggestionItem = {
    code: string;
    name: string;
    market: 'KOSPI' | 'KOSDAQ';
};

export type StockSuggestionsErrorResponse = {
    message: string;
};
