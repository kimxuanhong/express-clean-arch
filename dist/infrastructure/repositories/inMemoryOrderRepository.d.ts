import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Order } from '../../domain/entities/order';
import { UpdateOrderData } from '../../types';
export declare class InMemoryOrderRepository extends OrderRepository {
    private orders;
    constructor();
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    update(id: string, data: UpdateOrderData): Promise<Order>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=inMemoryOrderRepository.d.ts.map