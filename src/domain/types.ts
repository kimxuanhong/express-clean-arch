// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt: Date;
}

// User related interfaces
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

// Order related interfaces
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

// Payment related interfaces
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
