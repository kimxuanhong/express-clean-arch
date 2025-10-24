import { Payment, UpdatePaymentData } from '../types';

/**
 * @fileoverview Payment Repository Interface - Contract for payment data access
 */

/**
 * Payment Repository Interface
 * @interface
 * @description Defines the contract for payment data access operations
 */
export interface PaymentRepository {
  /**
   * Creates a new payment
   * @param payment - Payment data
   * @returns Promise<Payment> - Created payment
   */
  create(payment: Payment): Promise<Payment>;

  /**
   * Finds a payment by ID
   * @param id - Payment ID
   * @returns Promise<Payment | null> - Payment or null if not found
   */
  findById(id: string): Promise<Payment | null>;

  /**
   * Retrieves all payments
   * @returns Promise<Payment[]> - Array of payments
   */
  findAll(): Promise<Payment[]>;

  /**
   * Updates a payment
   * @param id - Payment ID
   * @param data - Update data
   * @returns Promise<Payment> - Updated payment
   */
  update(id: string, data: UpdatePaymentData): Promise<Payment>;

  /**
   * Deletes a payment
   * @param id - Payment ID
   * @returns Promise<void>
   */
  delete(id: string): Promise<void>;
}
