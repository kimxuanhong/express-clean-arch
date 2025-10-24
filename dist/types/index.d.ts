import { Request, Response, NextFunction } from 'express';
export interface BaseEntity {
    id: string;
    createdAt: Date;
}
export interface User extends BaseEntity {
    name: string;
    email: string;
    password?: string | undefined;
}
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
}
export interface UpdateUserData {
    name?: string;
    email?: string;
    password?: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface LoginResult {
    token: string;
    user: Omit<User, 'password'>;
}
export interface Order extends BaseEntity {
    userId: string;
    amount: number;
    status: 'pending' | 'completed' | 'cancelled';
    items: string[];
}
export interface CreateOrderData {
    userId: string;
    amount: number;
    items: string[];
}
export interface UpdateOrderData {
    amount?: number;
    status?: 'pending' | 'completed' | 'cancelled';
    items?: string[];
}
export interface Payment extends BaseEntity {
    orderId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    method: string;
}
export interface CreatePaymentData {
    orderId: string;
    amount: number;
    method: string;
}
export interface UpdatePaymentData {
    amount?: number;
    status?: 'pending' | 'completed' | 'failed';
    method?: string;
}
export interface CreateUser {
    execute(data: CreateUserData): Promise<User>;
}
export interface GetUser {
    execute(params: {
        id: string;
    }): Promise<User>;
}
export interface ListUsers {
    execute(): Promise<User[]>;
}
export interface UpdateUser {
    execute(params: {
        id: string;
        data: UpdateUserData;
    }): Promise<User>;
}
export interface DeleteUser {
    execute(params: {
        id: string;
    }): Promise<void>;
}
export interface LoginUser {
    execute(data: LoginData): Promise<LoginResult>;
}
export interface CreateOrder {
    execute(data: CreateOrderData): Promise<Order>;
}
export interface GetOrder {
    execute(params: {
        id: string;
    }): Promise<Order>;
}
export interface ListOrders {
    execute(): Promise<Order[]>;
}
export interface CreatePayment {
    execute(data: CreatePaymentData): Promise<Payment>;
}
export interface GetPayment {
    execute(params: {
        id: string;
    }): Promise<Payment>;
}
export interface ListPayments {
    execute(): Promise<Payment[]>;
}
export interface UpdatePayment {
    execute(params: {
        id: string;
        data: UpdatePaymentData;
    }): Promise<Payment>;
}
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
export interface UserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, data: UpdateUserData): Promise<User>;
    delete(id: string): Promise<void>;
}
export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    update(id: string, data: UpdateOrderData): Promise<Order>;
    delete(id: string): Promise<void>;
}
export interface PaymentRepository {
    create(payment: Payment): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findAll(): Promise<Payment[]>;
    update(id: string, data: UpdatePaymentData): Promise<Payment>;
    delete(id: string): Promise<void>;
}
export interface ExpressRequest extends Request {
}
export interface ExpressResponse extends Response {
}
export interface ExpressNextFunction extends NextFunction {
}
export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}
export interface JwtPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
}
//# sourceMappingURL=index.d.ts.map