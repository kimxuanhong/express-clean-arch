const express = require('express');
const { body } = require('express-validator');
const handleValidationErrors = require('../../app/middleware/validateRequest');
const { verifyToken } = require('../../app/middleware/authJwt');

function makeUserRoutes({userController}) {
    const router = express.Router();
    
    // Public routes
    
    // Login route (no JWT required)
    router.post('/login', [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters')
    ], handleValidationErrors, (req, res, next) => userController.login(req, res, next));
    
    // Register route with validation
    router.post('/', [
        body('name').notEmpty().withMessage('Name is required').isLength({min: 2}).withMessage('Name must be at least 2 characters'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').optional().isLength({min: 6}).withMessage('Password must be at least 6 characters if provided')
    ], handleValidationErrors, (req, res, next) => userController.create(req, res, next));
    
    // Protected routes (require JWT)
    
    // Get all users
    router.get('/', verifyToken, (req, res, next) => userController.list(req, res, next));
    
    // Get user by ID
    router.get('/:id', verifyToken, (req, res, next) => userController.get(req, res, next));
    
    // Update user
    router.put('/:id', verifyToken, [
        body('name').optional().isLength({min: 2}).withMessage('Name must be at least 2 characters'),
        body('email').optional().isEmail().withMessage('Invalid email')
    ], handleValidationErrors, (req, res, next) => userController.update(req, res, next));
    
    // Delete user
    router.delete('/:id', verifyToken, (req, res, next) => userController.delete(req, res, next));
    
    return router;
}

module.exports = makeUserRoutes;
