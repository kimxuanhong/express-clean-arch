/**
 * @fileoverview Payment Controller - Handles HTTP requests for payment operations
 */

/**
 * PaymentController - HTTP request handler for payment management
 * @class
 */
class PaymentController {
    /**
     * Creates a PaymentController instance
     * @constructor
     * @param {{
     *   createPayment: CreatePayment,
     *   getPayment: GetPayment,
     *   listPayments: ListPayments
     * }} deps - Use case dependencies
     */
    constructor({createPayment, getPayment, listPayments}) {
        this.createPayment = createPayment;
        this.getPayment = getPayment;
        this.listPayments = listPayments;
        this.updatePayment = null;
    }

    /**
     * Creates a new payment
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async create(req, res, next) {
        try {
            const p = await this.createPayment.execute(req.body);
            res.status(201).json(p);
        } catch (e) {
            next(e);
        }
    }

    /**
     * Retrieves a payment by ID
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async get(req, res, next) {
        try {
            const p = await this.getPayment.execute({id: req.params.id});
            res.json(p);
        } catch (e) {
            next(e);
        }
    }

    /**
     * Retrieves all payments
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async list(req, res, next) {
        try {
            const ps = await this.listPayments.execute();
            res.json(ps);
        } catch (e) {
            next(e);
        }
    }

    /**
     * Updates a payment
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async update(req, res, next) {
        try {
            if (!this.updatePayment) return res.status(501).send();
            const p = await this.updatePayment.execute({id: req.params.id, data: req.body});
            res.json(p);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = PaymentController;
