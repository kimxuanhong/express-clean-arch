class PaymentController {
    constructor({createPayment, getPayment, listPayments}) {
        this.createPayment = createPayment;
        this.getPayment = getPayment;
        this.listPayments = listPayments;
        this.updatePayment = null;
    }

    async create(req, res, next) {
        try {
            const p = await this.createPayment.execute(req.body);
            res.status(201).json(p);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const p = await this.getPayment.execute({id: req.params.id});
            res.json(p);
        } catch (e) {
            next(e);
        }
    }

    async list(req, res, next) {
        try {
            const ps = await this.listPayments.execute();
            res.json(ps);
        } catch (e) {
            next(e);
        }
    }

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
