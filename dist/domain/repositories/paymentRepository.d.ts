import { Payment, UpdatePaymentData } from '../../types';
export declare abstract class PaymentRepository {
    abstract create(payment: Payment): Promise<Payment>;
    abstract findById(id: string): Promise<Payment | null>;
    abstract findAll(): Promise<Payment[]>;
    abstract update(id: string, data: UpdatePaymentData): Promise<Payment>;
    abstract delete(id: string): Promise<void>;
}
//# sourceMappingURL=paymentRepository.d.ts.map