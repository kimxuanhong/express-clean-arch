import express, { Router } from 'express';
import { OrderController } from '../controllers/orderController';

/**
 * @fileoverview Order Routes - Express router configuration for order endpoints
 */

/**
 * Creates order routes
 * @param deps - Dependencies
 * @returns Express router
 */
export function makeOrderRoutes({ orderController }: { orderController: OrderController }): Router {
  const router = express.Router();
  
  router.post('/', (req, res, next) => orderController.create(req, res, next));
  router.get('/', (req, res, next) => orderController.list(req, res, next));
  router.get('/:id', (req, res, next) => orderController.get(req, res, next));
  
  return router;
}
