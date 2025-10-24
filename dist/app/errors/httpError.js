"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.name = 'HttpError';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=httpError.js.map