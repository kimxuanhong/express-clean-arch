import express, { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';

/**
 * @fileoverview Payment Routes - Express router configuration for payment endpoints
 */

/**
 * Creates payment routes
 * @param deps - Dependencies
 * @returns Express router
 */
export function makePaymentRoutes({ paymentController }: { paymentController: PaymentController }): Router {
  const router = express.Router();
  
  router.post('/', (req, res, next) => paymentController.create(req, res, next));
  router.get('/', (req, res, next) => paymentController.list(req, res, next));
  router.get('/:id', (req, res, next) => paymentController.get(req, res, next));
  router.put('/:id', (req, res, next) => paymentController.update(req, res, next));
  
  return router;
}
