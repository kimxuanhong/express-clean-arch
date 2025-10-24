import { v4 as uuidv4 } from 'uuid';
import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Payment } from '../../domain/entities/payment';
import { CreatePayment as ICreatePayment } from './types';
import { CreatePaymentData } from '../../domain/types';

/**
 * @fileoverview CreatePayment Use Case - Handles payment creation business logic
 */

/**
 * CreatePayment Use Case
 * @class
 * @description Handles the business logic for creating a new payment
 */
export class CreatePayment implements ICreatePayment {
  private paymentRepo: PaymentRepository;
  private orderRepo: OrderRepository;

  /**
   * Creates a CreatePayment use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ 
    paymentRepo, 
    orderRepo 
  }: { 
    paymentRepo: PaymentRepository;
    orderRepo: OrderRepository;
  }) {
    this.paymentRepo = paymentRepo;
    this.orderRepo = orderRepo;
  }

  /**
   * Executes payment creation
   * @async
   * @param data - Payment data
   * @returns Promise<Payment> Created payment object
   * @throws Error If validation fails
   */
  async execute({ orderId, amount, method }: CreatePaymentData): Promise<Payment> {
    if (!orderId || typeof amount !== 'number') {
      throw new Error('orderId and numeric amount required');
    }
    
    if (!method) {
      throw new Error('payment method is required');
    }
    
    // Validate order exists
    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new Error('order not found');
    }
    
    // Validate amount matches order total
    if (Number(order.amount) !== Number(amount)) {
      throw new Error('amount does not match order total');
    }
    
    const id = uuidv4();
    const payment = new Payment({
      id,
      orderId,
      amount,
      status: 'pending',
      method,
      createdAt: new Date()
    });
    
    return await this.paymentRepo.create(payment);
  }
}
