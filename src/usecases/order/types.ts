import { 
  Order,
  CreateOrderData
} from '../../domain/types';

// Order use case interfaces
export interface CreateOrder {
  execute(data: CreateOrderData): Promise<Order>;
}

export interface GetOrder {
  execute(params: { id: string }): Promise<Order>;
}

export interface ListOrders {
  execute(): Promise<Order[]>;
}
