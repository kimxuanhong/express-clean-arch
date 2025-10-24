import { Request, Response, NextFunction } from 'express';
import { OrderControllerDependencies } from './types';

/**
 * @fileoverview Order Controller - Handles HTTP requests for order operations
 */

/**
 * OrderController - HTTP request handler for order management
 * @class
 */
export class OrderController {
  private createOrder: OrderControllerDependencies['createOrder'];
  private getOrder: OrderControllerDependencies['getOrder'];
  private listOrders: OrderControllerDependencies['listOrders'];

  /**
   * Creates an OrderController instance
   * @constructor
   * @param deps - Use case dependencies
   */
  constructor(deps: OrderControllerDependencies) {
    this.createOrder = deps.createOrder;
    this.getOrder = deps.getOrder;
    this.listOrders = deps.listOrders;
  }

  /**
   * Creates a new order
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await this.createOrder.execute(req.body);
      res.status(201).json(order);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Retrieves an order by ID
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
      const order = await this.getOrder.execute({ id });
      res.json(order);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Retrieves all orders
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await this.listOrders.execute();
      res.json(orders);
    } catch (e) {
      next(e);
    }
  }
}
