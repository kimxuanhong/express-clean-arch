import { v4 as uuidv4 } from 'uuid';
import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Order } from '../../domain/entities/order';
import { CreateOrder as ICreateOrder } from './types';
import { CreateOrderData } from '../../domain/types';

/**
 * @fileoverview CreateOrder Use Case - Handles order creation business logic
 */

/**
 * CreateOrder Use Case
 * @class
 * @description Handles the business logic for creating a new order
 */
export class CreateOrder implements ICreateOrder {
  private orderRepo: OrderRepository;

  /**
   * Creates a CreateOrder use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ orderRepo }: { orderRepo: OrderRepository }) {
    this.orderRepo = orderRepo;
  }

  /**
   * Executes order creation
   * @async
   * @param data - Order data
   * @returns Promise<Order> Created order object
   * @throws Error If validation fails
   */
  async execute({ userId, amount, items }: CreateOrderData): Promise<Order> {
    if (!userId) {
      throw new Error('userId is required');
    }
    
    if (amount < 0) {
      throw new Error('amount must be non-negative');
    }
    
    if (!Array.isArray(items)) {
      throw new Error('items must be an array');
    }
    
    const id = uuidv4();
    const order = new Order({
      id,
      userId,
      amount,
      status: 'pending',
      items,
      createdAt: new Date()
    });
    
    return await this.orderRepo.create(order);
  }
}
