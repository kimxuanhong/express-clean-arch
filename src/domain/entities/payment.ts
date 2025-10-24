import { Payment as IPayment } from '../types';

/**
 * @fileoverview Payment Entity - Core business entity representing a payment
 */

/**
 * Payment Entity
 * @class
 * @description Represents a payment in the system domain layer
 */
export class Payment implements IPayment {
  public readonly id: string;
  public readonly orderId: string;
  public readonly amount: number;
  public readonly status: 'pending' | 'completed' | 'failed';
  public readonly method: string;
  public readonly createdAt: Date;

  /**
   * Creates a Payment instance
   * @constructor
   * @param paymentData - Payment data
   */
  constructor({ 
    id, 
    orderId, 
    amount, 
    status = 'pending', 
    method, 
    createdAt = new Date() 
  }: IPayment) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.status = status;
    this.method = method;
    this.createdAt = createdAt;
  }
}
