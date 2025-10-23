const express = require('express');
const bodyParser = require('express').json;
const InMemoryUserRepo = require('../infrastructure/repositories/inMemoryUserRepository');
const CreateUser = require('../usecases/user/createUser');
const GetUser = require('../usecases/user/getUser');
const ListUsers = require('../usecases/user/listUsers');
const UpdateUser = require('../usecases/user/updateUser');
const DeleteUser = require('../usecases/user/deleteUser');
const LoginUser = require('../usecases/user/loginUser');
const UserController = require('../interfaces/controllers/userController');
const makeUserRoutes = require('../interfaces/routes/userRoutes');
const errorHandler = require('./errors/errorHandler');

function makeApp() {
    const app = express();
    
    // CORS middleware
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });
    
    app.use(bodyParser());
    const logger = require('./logger');
    const requestId = require('./middleware/requestId');
    app.use(requestId);
    // simple request logging with requestId
    app.use((req, res, next) => {
        logger.info('%s %s', req.method, req.url, {requestId: req.requestId});
        next();
    });

    const userRepo = new InMemoryUserRepo();
    const createUser = new CreateUser({userRepo});
    const getUser = new GetUser({userRepo});
    const listUsers = new ListUsers({userRepo});
    const updateUser = new UpdateUser({userRepo});
    const deleteUser = new DeleteUser({userRepo});
    const loginUser = new LoginUser({userRepo});

    const userController = new UserController({createUser, getUser, listUsers, updateUser, deleteUser, loginUser});

    app.use('/users', makeUserRoutes({userController}));

    // Orders
    const InMemoryOrderRepo = require('../infrastructure/repositories/inMemoryOrderRepository');
    const CreateOrder = require('../usecases/order/createOrder');
    const GetOrder = require('../usecases/order/getOrder');
    const ListOrders = require('../usecases/order/listOrders');
    const orderRepo = new InMemoryOrderRepo();
    const createOrder = new CreateOrder({orderRepo});
    const getOrder = new GetOrder({orderRepo});
    const listOrders = new ListOrders({orderRepo});
    const OrderController = require('../interfaces/controllers/orderController');
    const makeOrderRoutes = require('../interfaces/routes/orderRoutes');
    const orderController = new OrderController({createOrder, getOrder, listOrders});
    app.use('/orders', makeOrderRoutes({orderController}));

    // Payments
    const InMemoryPaymentRepo = require('../infrastructure/repositories/inMemoryPaymentRepository');
    const GetPayment = require('../usecases/payment/getPayment');
    const ListPayments = require('../usecases/payment/listPayments');
    const paymentRepo = new InMemoryPaymentRepo();
    const CreatePayment = require('../usecases/payment/createPayment');
    const UpdatePayment = require('../usecases/payment/updatePayment');
    const createPayment = new CreatePayment({paymentRepo, orderRepo});
    const getPayment = new GetPayment({paymentRepo});
    const listPayments = new ListPayments({paymentRepo});
    const PaymentController = require('../interfaces/controllers/paymentController');
    const makePaymentRoutes = require('../interfaces/routes/paymentRoutes');
    const paymentController = new PaymentController({createPayment, getPayment, listPayments});
    paymentController.updatePayment = new UpdatePayment({paymentRepo});
    app.use('/payments', makePaymentRoutes({paymentController}));

    // Swagger UI
    const swaggerUi = require('swagger-ui-express');
    const swaggerSpec = require('./swagger');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // error handler logs
    const errorHandlerWithLogger = (err, req, res, next) => {
        const logger = require('./logger');
        logger.error(err, {requestId: req && req.requestId});
        return errorHandler(err, req, res, next);
    };
    app.use(errorHandlerWithLogger);

    return app;
}

module.exports = makeApp;
