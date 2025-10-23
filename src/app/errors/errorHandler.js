function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);
    const status = err.status || 500;
    res.status(status).json({error: err.message || 'Internal error'});
}

module.exports = errorHandler;
