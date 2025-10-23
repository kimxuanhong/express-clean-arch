const express = require('express');

function makePaymentRoutes({paymentController}) {
    const r = express.Router();
    r.post('/', (req, res, next) => paymentController.create(req, res, next));
    r.get('/', (req, res, next) => paymentController.list(req, res, next));
    r.get('/:id', (req, res, next) => paymentController.get(req, res, next));
    r.put('/:id', (req, res, next) => paymentController.update(req, res, next));
    return r;
}

module.exports = makePaymentRoutes;
