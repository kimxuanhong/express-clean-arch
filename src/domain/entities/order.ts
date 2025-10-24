import { Order as IOrder } from '../types';

/**
 * @fileoverview Order Entity - Core business entity representing an order
 */

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

/**
 * Order Entity
 * @class
 * @description Represents an order in the system domain layer
 */
export class Order implements IOrder {
  public readonly id: string;
  public readonly userId: string;
  public readonly amount: number;
  public readonly status: 'pending' | 'completed' | 'cancelled';
  public readonly items: string[];
  public readonly createdAt: Date;

  /**
   * Creates an Order instance
   * @constructor
   * @param orderData - Order data
   */
  constructor({ 
    id, 
    userId, 
    amount, 
    status = 'pending', 
    items = [], 
    createdAt = new Date() 
  }: IOrder) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.status = status;
    this.items = items;
    this.createdAt = createdAt;
  }
}
