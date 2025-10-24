import { 
  CreateUser,
  GetUser,
  ListUsers,
  UpdateUser,
  DeleteUser,
  LoginUser
} from '../../usecases/user/types';
import {
  CreateOrder,
  GetOrder,
  ListOrders
} from '../../usecases/order/types';
import {
  CreatePayment,
  GetPayment,
  ListPayments,
  UpdatePayment
} from '../../usecases/payment/types';

// Controller dependency interfaces
export interface UserControllerDependencies {
  createUser: CreateUser;
  getUser: GetUser;
  listUsers: ListUsers;
  updateUser: UpdateUser;
  deleteUser: DeleteUser;
  loginUser: LoginUser;
}

export interface OrderControllerDependencies {
  createOrder: CreateOrder;
  getOrder: GetOrder;
  listOrders: ListOrders;
}

export interface PaymentControllerDependencies {
  createPayment: CreatePayment;
  getPayment: GetPayment;
  listPayments: ListPayments;
  updatePayment: UpdatePayment;
}
