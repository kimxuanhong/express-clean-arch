import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { Payment } from '../../domain/entities/payment';
import { GetPayment as IGetPayment } from './types';

/**
 * @fileoverview GetPayment Use Case - Handles payment retrieval business logic
 */

/**
 * GetPayment Use Case
 * @class
 * @description Handles the business logic for retrieving a payment by ID
 */
export class GetPayment implements IGetPayment {
  private paymentRepo: PaymentRepository;

  /**
   * Creates a GetPayment use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ paymentRepo }: { paymentRepo: PaymentRepository }) {
    this.paymentRepo = paymentRepo;
  }

  /**
   * Executes payment retrieval
   * @async
   * @param params - Input parameters
   * @returns Promise<Payment> Payment object
   * @throws Error If payment not found
   */
  async execute({ id }: { id: string }): Promise<Payment> {
    if (!id) {
      throw new Error('id required');
    }
    
    const payment = await this.paymentRepo.findById(id);
    if (!payment) {
      throw new Error('payment not found');
    }
    
    return payment;
  }
}
