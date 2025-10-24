import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Order } from '../../domain/entities/order';
import { CreateOrder as ICreateOrder, CreateOrderData } from '../../types';
export declare class CreateOrder implements ICreateOrder {
    private orderRepo;
    constructor({ orderRepo }: {
        orderRepo: OrderRepository;
    });
    execute({ userId, amount, items }: CreateOrderData): Promise<Order>;
}
//# sourceMappingURL=createOrder.d.ts.map