import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { Payment } from '../../domain/entities/payment';
import { UpdatePaymentData } from '../../domain/types';

/**
 * @fileoverview In-Memory Payment Repository - In-memory implementation of payment repository
 */

/**
 * In-Memory Payment Repository
 * @class
 * @description In-memory implementation of payment repository for development/testing
 */
export class InMemoryPaymentRepository extends PaymentRepository {
  private payments: Map<string, Payment>;

  constructor() {
    super();
    this.payments = new Map();
  }

  /**
   * Creates a new payment
   * @param payment - Payment data
   * @returns Promise<Payment> - Created payment
   */
  async create(payment: Payment): Promise<Payment> {
    this.payments.set(payment.id, payment);
    return payment;
  }

  /**
   * Finds a payment by ID
   * @param id - Payment ID
   * @returns Promise<Payment | null> - Payment or null if not found
   */
  async findById(id: string): Promise<Payment | null> {
    return this.payments.get(id) || null;
  }

  /**
   * Retrieves all payments
   * @returns Promise<Payment[]> - Array of payments
   */
  async findAll(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }

  /**
   * Updates a payment
   * @param id - Payment ID
   * @param data - Update data
   * @returns Promise<Payment> - Updated payment
   */
  async update(id: string, data: UpdatePaymentData): Promise<Payment> {
    const existing = this.payments.get(id);
    if (!existing) {
      throw new Error('Payment not found');
    }
    
    const updated = new Payment({
      ...existing,
      ...data
    });
    
    this.payments.set(id, updated);
    return updated;
  }

  /**
   * Deletes a payment
   * @param id - Payment ID
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    if (!this.payments.has(id)) {
      throw new Error('Payment not found');
    }
    this.payments.delete(id);
  }
}
