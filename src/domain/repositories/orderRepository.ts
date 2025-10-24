import { Order, UpdateOrderData } from '../types';

/**
 * @fileoverview Order Repository Interface - Contract for order data access
 */

/**
 * Order Repository Interface
 * @interface
 * @description Defines the contract for order data access operations
 */
export interface OrderRepository {
  /**
   * Creates a new order
   * @param order - Order data
   * @returns Promise<Order> - Created order
   */
  create(order: Order): Promise<Order>;

  /**
   * Finds an order by ID
   * @param id - Order ID
   * @returns Promise<Order | null> - Order or null if not found
   */
  findById(id: string): Promise<Order | null>;

  /**
   * Retrieves all orders
   * @returns Promise<Order[]> - Array of orders
   */
  findAll(): Promise<Order[]>;

  /**
   * Updates an order
   * @param id - Order ID
   * @param data - Update data
   * @returns Promise<Order> - Updated order
   */
  update(id: string, data: UpdateOrderData): Promise<Order>;

  /**
   * Deletes an order
   * @param id - Order ID
   * @returns Promise<void>
   */
  delete(id: string): Promise<void>;
}
