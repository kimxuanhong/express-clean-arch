import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Order } from '../../domain/entities/order';
import { ListOrders as IListOrders } from './types';

/**
 * @fileoverview ListOrders Use Case - Handles order listing business logic
 */

/**
 * ListOrders Use Case
 * @class
 * @description Handles the business logic for retrieving all orders
 */
export class ListOrders implements IListOrders {
  private orderRepo: OrderRepository;

  /**
   * Creates a ListOrders use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ orderRepo }: { orderRepo: OrderRepository }) {
    this.orderRepo = orderRepo;
  }

  /**
   * Executes order listing
   * @async
   * @returns Promise<Order[]> Array of orders
   */
  async execute(): Promise<Order[]> {
    return await this.orderRepo.findAll();
  }
}
