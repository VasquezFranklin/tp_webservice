export interface ConversorResponse {
    success: boolean;
    query: {
        from: string;
        to: string;
        amount: number;
    };
    result: number;
}