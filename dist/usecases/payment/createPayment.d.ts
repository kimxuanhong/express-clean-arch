import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { OrderRepository } from '../../domain/repositories/orderRepository';
import { Payment } from '../../domain/entities/payment';
import { CreatePayment as ICreatePayment, CreatePaymentData } from '../../types';
export declare class CreatePayment implements ICreatePayment {
    private paymentRepo;
    private orderRepo;
    constructor({ paymentRepo, orderRepo }: {
        paymentRepo: PaymentRepository;
        orderRepo: OrderRepository;
    });
    execute({ orderId, amount, method }: CreatePaymentData): Promise<Payment>;
}
//# sourceMappingURL=createPayment.d.ts.map