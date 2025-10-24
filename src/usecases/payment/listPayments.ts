import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { Payment } from '../../domain/entities/payment';
import { ListPayments as IListPayments } from './types';

/**
 * @fileoverview ListPayments Use Case - Handles payment listing business logic
 */

/**
 * ListPayments Use Case
 * @class
 * @description Handles the business logic for retrieving all payments
 */
export class ListPayments implements IListPayments {
  private paymentRepo: PaymentRepository;

  /**
   * Creates a ListPayments use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ paymentRepo }: { paymentRepo: PaymentRepository }) {
    this.paymentRepo = paymentRepo;
  }

  /**
   * Executes payment listing
   * @async
   * @returns Promise<Payment[]> Array of payments
   */
  async execute(): Promise<Payment[]> {
    return await this.paymentRepo.findAll();
  }
}
