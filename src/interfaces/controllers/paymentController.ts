import { Request, Response, NextFunction } from 'express';
import { PaymentControllerDependencies } from './types';

/**
 * @fileoverview Payment Controller - Handles HTTP requests for payment operations
 */

/**
 * PaymentController - HTTP request handler for payment management
 * @class
 */
export class PaymentController {
  private createPayment: PaymentControllerDependencies['createPayment'];
  private getPayment: PaymentControllerDependencies['getPayment'];
  private listPayments: PaymentControllerDependencies['listPayments'];
  private updatePayment: PaymentControllerDependencies['updatePayment'];

  /**
   * Creates a PaymentController instance
   * @constructor
   * @param deps - Use case dependencies
   */
  constructor(deps: PaymentControllerDependencies) {
    this.createPayment = deps.createPayment;
    this.getPayment = deps.getPayment;
    this.listPayments = deps.listPayments;
    this.updatePayment = deps.updatePayment;
  }

  /**
   * Creates a new payment
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payment = await this.createPayment.execute(req.body);
      res.status(201).json(payment);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Retrieves a payment by ID
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'];
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      const payment = await this.getPayment.execute({ id });
      res.json(payment);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Retrieves all payments
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payments = await this.listPayments.execute();
      res.json(payments);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Updates a payment
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'];
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      const payment = await this.updatePayment.execute({ id, data: req.body });
      res.json(payment);
    } catch (e) {
      next(e);
    }
  }
}
