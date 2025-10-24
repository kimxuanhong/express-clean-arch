import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { Payment } from '../../domain/entities/payment';
import { UpdatePayment as IUpdatePayment } from './types';
import { UpdatePaymentData } from '../../domain/types';

/**
 * @fileoverview UpdatePayment Use Case - Handles payment update business logic
 */

/**
 * UpdatePayment Use Case
 * @class
 * @description Handles the business logic for updating a payment
 */
export class UpdatePayment implements IUpdatePayment {
  private paymentRepo: PaymentRepository;

  /**
   * Creates an UpdatePayment use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ paymentRepo }: { paymentRepo: PaymentRepository }) {
    this.paymentRepo = paymentRepo;
  }

  /**
   * Executes payment update
   * @async
   * @param params - Input parameters
   * @returns Promise<Payment> Updated payment object
   * @throws Error If payment not found or invalid transition
   */
  async execute({ id, data }: { id: string; data: UpdatePaymentData }): Promise<Payment> {
    if (!id) {
      throw new Error('id required');
    }
    
    const existing = await this.paymentRepo.findById(id);
    if (!existing) {
      throw new Error('payment not found');
    }
    
    // Only allow status transition pending -> completed for now
    if (data.status && existing.status === 'pending' && data.status === 'completed') {
      return await this.paymentRepo.update(id, { ...existing, status: 'completed' });
    }
    
    // Allow other updates if no status change
    if (!data.status) {
      return await this.paymentRepo.update(id, data);
    }
    
    // Reject invalid transitions
    throw new Error('invalid status transition');
  }
}
