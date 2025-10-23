const express = require('express');

function makeUserRoutes({userController}) {
    const router = express.Router();
    router.post('/', (req, res, next) => userController.create(req, res, next));
    router.get('/', (req, res, next) => userController.list(req, res, next));
    router.get('/:id', (req, res, next) => userController.get(req, res, next));
    router.put('/:id', (req, res, next) => userController.update(req, res, next));
    router.delete('/:id', (req, res, next) => userController.delete(req, res, next));
    return router;
}

module.exports = makeUserRoutes;
