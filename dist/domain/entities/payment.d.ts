import { Payment as IPayment } from '../../types';
export declare class Payment implements IPayment {
    readonly id: string;
    readonly orderId: string;
    readonly amount: number;
    readonly status: 'pending' | 'completed' | 'failed';
    readonly method: string;
    readonly createdAt: Date;
    constructor({ id, orderId, amount, status, method, createdAt }: IPayment);
}
//# sourceMappingURL=payment.d.ts.map