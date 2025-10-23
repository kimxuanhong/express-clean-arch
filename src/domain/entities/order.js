/**
 * @fileoverview Order Entity - Core business entity representing an order
 */

/**
 * Order Entity
 * @class
 * @description Represents an order in the system domain layer
 */
class Order {
    /**
     * Creates an Order instance
     * @constructor
     * @param {{
     *   id: string,
     *   items?: Array<{name: string, quantity: number, price: number}>,
     *   total?: number,
     *   createdAt?: Date
     * }} orderData - Order data
     */
    constructor({id, items = [], total = 0, createdAt = new Date()}) {
        this.id = id;
        this.items = items;
        this.total = total;
        this.createdAt = createdAt;
    }
}

module.exports = Order;
