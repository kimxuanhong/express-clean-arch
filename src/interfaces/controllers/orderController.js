class OrderController {
    constructor({createOrder, getOrder, listOrders}) {
        this.createOrder = createOrder;
        this.getOrder = getOrder;
        this.listOrders = listOrders;
    }

    async create(req, res, next) {
        try {
            const order = await this.createOrder.execute(req.body);
            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const order = await this.getOrder.execute({id: req.params.id});
            res.json(order);
        } catch (e) {
            next(e);
        }
    }

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
