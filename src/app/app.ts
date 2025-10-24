import express, { Application } from 'express';
import { InMemoryUserRepository } from '../infrastructure/repositories/inMemoryUserRepository';
import { InMemoryOrderRepository } from '../infrastructure/repositories/inMemoryOrderRepository';
import { InMemoryPaymentRepository } from '../infrastructure/repositories/inMemoryPaymentRepository';
import { CreateUser } from '../usecases/user/createUser';
import { GetUser } from '../usecases/user/getUser';
import { ListUsers } from '../usecases/user/listUsers';
import { UpdateUser } from '../usecases/user/updateUser';
import { DeleteUser } from '../usecases/user/deleteUser';
import { LoginUser } from '../usecases/user/loginUser';
import { CreateOrder } from '../usecases/order/createOrder';
import { GetOrder } from '../usecases/order/getOrder';
import { ListOrders } from '../usecases/order/listOrders';
import { CreatePayment } from '../usecases/payment/createPayment';
import { GetPayment } from '../usecases/payment/getPayment';
import { ListPayments } from '../usecases/payment/listPayments';
import { UpdatePayment } from '../usecases/payment/updatePayment';
import { UserController } from '../interfaces/controllers/userController';
import { OrderController } from '../interfaces/controllers/orderController';
import { PaymentController } from '../interfaces/controllers/paymentController';
import { makeUserRoutes } from '../interfaces/routes/userRoutes';
import { makeOrderRoutes } from '../interfaces/routes/orderRoutes';
import { makePaymentRoutes } from '../interfaces/routes/paymentRoutes';
import { errorHandler } from './errors/errorHandler';
import { generateToken } from './middleware/authJwt';
import logger from './logger';
import { requestIdMiddleware } from './middleware/requestId';

/**
 * @fileoverview Express App Configuration - Main application setup
 */

/**
 * Creates and configures the Express application
 * @returns Express application instance
 */
export function makeApp(): Application {
  const app = express();
  
  // CORS middleware
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
  
  app.use(express.json());
  app.use(requestIdMiddleware);
  
  // Simple request logging with requestId
  app.use((req, _res, next) => {
    logger.info('%s %s', req.method, req.url, { requestId: (req as any).requestId });
    next();
  });

  // User dependencies
  const userRepo = new InMemoryUserRepository();
  const createUser = new CreateUser({ userRepo });
  const getUser = new GetUser({ userRepo });
  const listUsers = new ListUsers({ userRepo });
  const updateUser = new UpdateUser({ userRepo });
  const deleteUser = new DeleteUser({ userRepo });
  const loginUser = new LoginUser({ userRepo, generateToken });

  const userController = new UserController({
    createUser,
    getUser,
    listUsers,
    updateUser,
    deleteUser,
    loginUser
  });

  app.use('/users', makeUserRoutes({ userController }));

  // Order dependencies
  const orderRepo = new InMemoryOrderRepository();
  const createOrder = new CreateOrder({ orderRepo });
  const getOrder = new GetOrder({ orderRepo });
  const listOrders = new ListOrders({ orderRepo });
  const orderController = new OrderController({ createOrder, getOrder, listOrders });
  app.use('/orders', makeOrderRoutes({ orderController }));

  // Payment dependencies
  const paymentRepo = new InMemoryPaymentRepository();
  const createPayment = new CreatePayment({ paymentRepo, orderRepo });
  const getPayment = new GetPayment({ paymentRepo });
  const listPayments = new ListPayments({ paymentRepo });
  const updatePayment = new UpdatePayment({ paymentRepo });
  const paymentController = new PaymentController({
    createPayment,
    getPayment,
    listPayments,
    updatePayment
  });
  app.use('/payments', makePaymentRoutes({ paymentController }));

  // Swagger UI (only in development)
  if (process.env['NODE_ENV'] !== 'test') {
    try {
      const swaggerUi = require('swagger-ui-express');
      const swaggerSpec = require('./swagger').default;
      app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    } catch (err) {
      // Swagger not available, skip
    }
  }

  // Error handler with logger
  const errorHandlerWithLogger = (err: any, req: any, res: any, next: any) => {
    logger.error(err, { requestId: req && req.requestId });
    return errorHandler(err, req, res, next);
  };
  app.use(errorHandlerWithLogger);

  return app;
}
