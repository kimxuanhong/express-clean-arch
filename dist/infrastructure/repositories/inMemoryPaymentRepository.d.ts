import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { Payment } from '../../domain/entities/payment';
import { UpdatePaymentData } from '../../types';
export declare class InMemoryPaymentRepository extends PaymentRepository {
    private payments;
    constructor();
    create(payment: Payment): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findAll(): Promise<Payment[]>;
    update(id: string, data: UpdatePaymentData): Promise<Payment>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=inMemoryPaymentRepository.d.ts.map