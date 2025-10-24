import { AppError } from '../../types';
export declare class HttpError extends Error implements AppError {
    statusCode: number;
    isOperational: boolean;
    constructor(statusCode: number, message: string);
}
//# sourceMappingURL=httpError.d.ts.map