import { Order, UpdateOrderData } from '../../types';
export declare abstract class OrderRepository {
    abstract create(order: Order): Promise<Order>;
    abstract findById(id: string): Promise<Order | null>;
    abstract findAll(): Promise<Order[]>;
    abstract update(id: string, data: UpdateOrderData): Promise<Order>;
    abstract delete(id: string): Promise<void>;
}
//# sourceMappingURL=orderRepository.d.ts.map