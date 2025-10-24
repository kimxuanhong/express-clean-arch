"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApp = makeApp;
const express_1 = __importDefault(require("express"));
const inMemoryUserRepository_1 = require("../infrastructure/repositories/inMemoryUserRepository");
const inMemoryOrderRepository_1 = require("../infrastructure/repositories/inMemoryOrderRepository");
const inMemoryPaymentRepository_1 = require("../infrastructure/repositories/inMemoryPaymentRepository");
const createUser_1 = require("../usecases/user/createUser");
const getUser_1 = require("../usecases/user/getUser");
const listUsers_1 = require("../usecases/user/listUsers");
const updateUser_1 = require("../usecases/user/updateUser");
const deleteUser_1 = require("../usecases/user/deleteUser");
const loginUser_1 = require("../usecases/user/loginUser");
const createOrder_1 = require("../usecases/order/createOrder");
const getOrder_1 = require("../usecases/order/getOrder");
const listOrders_1 = require("../usecases/order/listOrders");
const createPayment_1 = require("../usecases/payment/createPayment");
const getPayment_1 = require("../usecases/payment/getPayment");
const listPayments_1 = require("../usecases/payment/listPayments");
const updatePayment_1 = require("../usecases/payment/updatePayment");
const userController_1 = require("../interfaces/controllers/userController");
const orderController_1 = require("../interfaces/controllers/orderController");
const paymentController_1 = require("../interfaces/controllers/paymentController");
const userRoutes_1 = require("../interfaces/routes/userRoutes");
const orderRoutes_1 = require("../interfaces/routes/orderRoutes");
const paymentRoutes_1 = require("../interfaces/routes/paymentRoutes");
const errorHandler_1 = require("./errors/errorHandler");
const authJwt_1 = require("./middleware/authJwt");
const logger_1 = __importDefault(require("./logger"));
const requestId_1 = require("./middleware/requestId");
function makeApp() {
    const app = (0, express_1.default)();
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
            return;
        }
        next();
    });
    app.use(express_1.default.json());
    app.use(requestId_1.requestIdMiddleware);
    app.use((req, _res, next) => {
        logger_1.default.info('%s %s', req.method, req.url, { requestId: req.requestId });
        next();
    });
    const userRepo = new inMemoryUserRepository_1.InMemoryUserRepository();
    const createUser = new createUser_1.CreateUser({ userRepo });
    const getUser = new getUser_1.GetUser({ userRepo });
    const listUsers = new listUsers_1.ListUsers({ userRepo });
    const updateUser = new updateUser_1.UpdateUser({ userRepo });
    const deleteUser = new deleteUser_1.DeleteUser({ userRepo });
    const loginUser = new loginUser_1.LoginUser({ userRepo, generateToken: authJwt_1.generateToken });
    const userController = new userController_1.UserController({
        createUser,
        getUser,
        listUsers,
        updateUser,
        deleteUser,
        loginUser
    });
    app.use('/users', (0, userRoutes_1.makeUserRoutes)({ userController }));
    const orderRepo = new inMemoryOrderRepository_1.InMemoryOrderRepository();
    const createOrder = new createOrder_1.CreateOrder({ orderRepo });
    const getOrder = new getOrder_1.GetOrder({ orderRepo });
    const listOrders = new listOrders_1.ListOrders({ orderRepo });
    const orderController = new orderController_1.OrderController({ createOrder, getOrder, listOrders });
    app.use('/orders', (0, orderRoutes_1.makeOrderRoutes)({ orderController }));
    const paymentRepo = new inMemoryPaymentRepository_1.InMemoryPaymentRepository();
    const createPayment = new createPayment_1.CreatePayment({ paymentRepo, orderRepo });
    const getPayment = new getPayment_1.GetPayment({ paymentRepo });
    const listPayments = new listPayments_1.ListPayments({ paymentRepo });
    const updatePayment = new updatePayment_1.UpdatePayment({ paymentRepo });
    const paymentController = new paymentController_1.PaymentController({
        createPayment,
        getPayment,
        listPayments,
        updatePayment
    });
    app.use('/payments', (0, paymentRoutes_1.makePaymentRoutes)({ paymentController }));
    if (process.env['NODE_ENV'] !== 'test') {
        try {
            const swaggerUi = require('swagger-ui-express');
            const swaggerSpec = require('./swagger').default;
            app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        }
        catch (err) {
        }
    }
    const errorHandlerWithLogger = (err, req, res, next) => {
        logger_1.default.error(err, { requestId: req && req.requestId });
        return (0, errorHandler_1.errorHandler)(err, req, res, next);
    };
    app.use(errorHandlerWithLogger);
    return app;
}
//# sourceMappingURL=app.js.map