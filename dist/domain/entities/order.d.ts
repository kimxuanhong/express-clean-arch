import { Order as IOrder } from '../../types';
export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}
export declare class Order implements IOrder {
    readonly id: string;
    readonly userId: string;
    readonly amount: number;
    readonly status: 'pending' | 'completed' | 'cancelled';
    readonly items: string[];
    readonly createdAt: Date;
    constructor({ id, userId, amount, status, items, createdAt }: IOrder);
}
//# sourceMappingURL=order.d.ts.map