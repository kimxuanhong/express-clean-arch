import express, { Router } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/userController';
import { handleValidationErrors } from '../../app/middleware/validateRequest';
import { verifyToken } from '../../app/middleware/authJwt';

/**
 * @fileoverview User Routes - Express router configuration for user endpoints
 */

/**
 * Creates user routes with validation and authentication
 * @param deps - Dependencies
 * @returns Express router
 */
export function makeUserRoutes({ userController }: { userController: UserController }): Router {
  const router = express.Router();
  
  // Public routes
  
  // Login route (no JWT required)
  router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ], handleValidationErrors, (req: any, res: any, next: any) => userController.login(req, res, next));
  
  // Register route with validation
  router.post('/', [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters if provided')
  ], handleValidationErrors, (req: any, res: any, next: any) => userController.create(req, res, next));
  
  // Protected routes (require JWT)
  
  // Get all users
  router.get('/', verifyToken, (req: any, res: any, next: any) => userController.list(req, res, next));
  
  // Get user by ID
  router.get('/:id', verifyToken, (req: any, res: any, next: any) => userController.get(req, res, next));
  
  // Update user
  router.put('/:id', verifyToken, [
    body('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').optional().isEmail().withMessage('Invalid email')
  ], handleValidationErrors, (req: any, res: any, next: any) => userController.update(req, res, next));
  
  // Delete user
  router.delete('/:id', verifyToken, (req: any, res: any, next: any) => userController.delete(req, res, next));
  
  return router;
}
