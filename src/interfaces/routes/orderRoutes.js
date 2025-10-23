const express = require('express');

function makeOrderRoutes({orderController}) {
    const r = express.Router();
    r.post('/', (req, res, next) => orderController.create(req, res, next));
    r.get('/', (req, res, next) => orderController.list(req, res, next));
    r.get('/:id', (req, res, next) => orderController.get(req, res, next));
    return r;
}

module.exports = makeOrderRoutes;
