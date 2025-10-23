/**
 * @fileoverview Order Controller - Handles HTTP requests for order operations
 */

/**
 * OrderController - HTTP request handler for order management
 * @class
 */
class OrderController {
    /**
     * Creates an OrderController instance
     * @constructor
     * @param {{
     *   createOrder: CreateOrder,
     *   getOrder: GetOrder,
     *   listOrders: ListOrders
     * }} deps - Use case dependencies
     */
    constructor({createOrder, getOrder, listOrders}) {
        this.createOrder = createOrder;
        this.getOrder = getOrder;
        this.listOrders = listOrders;
    }

    /**
     * Creates a new order
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async create(req, res, next) {
        try {
            const order = await this.createOrder.execute(req.body);
            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    }

    /**
     * Retrieves an order by ID
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async get(req, res, next) {
        try {
            const order = await this.getOrder.execute({id: req.params.id});
            res.json(order);
        } catch (e) {
            next(e);
        }
    }

    /**
     * Retrieves all orders
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async list(req, res, next) {
        try {
            const orders = await this.listOrders.execute();
            res.json(orders);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = OrderController;
