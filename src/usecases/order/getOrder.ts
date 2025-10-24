import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Order } from '../../domain/entities/order';
import { GetOrder as IGetOrder } from './types';

/**
 * @fileoverview GetOrder Use Case - Handles order retrieval business logic
 */

/**
 * GetOrder Use Case
 * @class
 * @description Handles the business logic for retrieving an order by ID
 */
export class GetOrder implements IGetOrder {
  private orderRepo: OrderRepository;

  /**
   * Creates a GetOrder use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ orderRepo }: { orderRepo: OrderRepository }) {
    this.orderRepo = orderRepo;
  }

  /**
   * Executes order retrieval
   * @async
   * @param params - Input parameters
   * @returns Promise<Order> Order object
   * @throws Error If order not found
   */
  async execute({ id }: { id: string }): Promise<Order> {
    if (!id) {
      throw new Error('id required');
    }
    
    const order = await this.orderRepo.findById(id);
    if (!order) {
      throw new Error('order not found');
    }
    
    return order;
  }
}
