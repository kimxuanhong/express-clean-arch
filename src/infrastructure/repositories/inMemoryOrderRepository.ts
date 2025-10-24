import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Order } from '../../domain/entities/order';
import { UpdateOrderData } from '../../domain/types';

/**
 * @fileoverview In-Memory Order Repository - In-memory implementation of order repository
 */

/**
 * In-Memory Order Repository
 * @class
 * @description In-memory implementation of order repository for development/testing
 */
export class InMemoryOrderRepository implements OrderRepository {
  private orders: Map<string, Order>;

  constructor() {
    this.orders = new Map();
  }

  /**
   * Creates a new order
   * @param order - Order data
   * @returns Promise<Order> - Created order
   */
  async create(order: Order): Promise<Order> {
    this.orders.set(order.id, order);
    return order;
  }

  /**
   * Finds an order by ID
   * @param id - Order ID
   * @returns Promise<Order | null> - Order or null if not found
   */
  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  /**
   * Retrieves all orders
   * @returns Promise<Order[]> - Array of orders
   */
  async findAll(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  /**
   * Updates an order
   * @param id - Order ID
   * @param data - Update data
   * @returns Promise<Order> - Updated order
   */
  async update(id: string, data: UpdateOrderData): Promise<Order> {
    const existing = this.orders.get(id);
    if (!existing) {
      throw new Error('Order not found');
    }
    
    const updated = new Order({
      ...existing,
      ...data
    });
    
    this.orders.set(id, updated);
    return updated;
  }

  /**
   * Deletes an order
   * @param id - Order ID
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    if (!this.orders.has(id)) {
      throw new Error('Order not found');
    }
    this.orders.delete(id);
  }
}
