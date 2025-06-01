export type ActionResponse<T> = {
    data?: T;
    success: boolean;
    error?: string;
};