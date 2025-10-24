import { Order, UpdateOrderData } from '../types';

/**
 * @fileoverview Order Repository Interface - Contract for order data access
 */

/**
 * Order Repository Interface
 * @interface
 * @description Defines the contract for order data access operations
 */
export abstract class OrderRepository {
  /**
   * Creates a new order
   * @param order - Order data
   * @returns Promise<Order> - Created order
   */
  abstract create(order: Order): Promise<Order>;

  /**
   * Finds an order by ID
   * @param id - Order ID
   * @returns Promise<Order | null> - Order or null if not found
   */
  abstract findById(id: string): Promise<Order | null>;

  /**
   * Retrieves all orders
   * @returns Promise<Order[]> - Array of orders
   */
  abstract findAll(): Promise<Order[]>;

  /**
   * Updates an order
   * @param id - Order ID
   * @param data - Update data
   * @returns Promise<Order> - Updated order
   */
  abstract update(id: string, data: UpdateOrderData): Promise<Order>;

  /**
   * Deletes an order
   * @param id - Order ID
   * @returns Promise<void>
   */
  abstract delete(id: string): Promise<void>;
}
