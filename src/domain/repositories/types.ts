import { 
  User, 
  UpdateUserData,
  Order,
  UpdateOrderData,
  Payment,
  UpdatePaymentData
} from '../types';

// Repository interfaces
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
