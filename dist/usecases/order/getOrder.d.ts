import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Order } from '../../domain/entities/order';
import { GetOrder as IGetOrder } from '../../types';
export declare class GetOrder implements IGetOrder {
    private orderRepo;
    constructor({ orderRepo }: {
        orderRepo: OrderRepository;
    });
    execute({ id }: {
        id: string;
    }): Promise<Order>;
}
//# sourceMappingURL=getOrder.d.ts.map