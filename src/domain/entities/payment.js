/**
 * @fileoverview Payment Entity - Core business entity representing a payment
 */

/**
 * Payment Entity
 * @class
 * @description Represents a payment in the system domain layer
 */
class Payment {
    /**
     * Creates a Payment instance
     * @constructor
     * @param {{
     *   id: string,
     *   orderId: string,
     *   amount?: number,
     *   status?: 'pending'|'completed'|'failed'|'cancelled',
     *   createdAt?: Date
     * }} paymentData - Payment data
     */
    constructor({id, orderId, amount = 0, status = 'pending', createdAt = new Date()}) {
        this.id = id;
        this.orderId = orderId;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
    }
}

module.exports = Payment;
