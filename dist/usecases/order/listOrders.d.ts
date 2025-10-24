import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Order } from '../../domain/entities/order';
import { ListOrders as IListOrders } from '../../types';
export declare class ListOrders implements IListOrders {
    private orderRepo;
    constructor({ orderRepo }: {
        orderRepo: OrderRepository;
    });
    execute(): Promise<Order[]>;
}
//# sourceMappingURL=listOrders.d.ts.map