"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, next) {
    if (res.headersSent) {
        next(err);
        return;
    }
    const status = err.statusCode || 500;
    res.status(status).json({
        error: err.message || 'Internal error',
        ...(process.env['NODE_ENV'] === 'development' && { stack: err.stack })
    });
}
//# sourceMappingURL=errorHandler.js.map