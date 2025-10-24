import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { Payment } from '../../domain/entities/payment';
import { ListPayments as IListPayments } from '../../types';
export declare class ListPayments implements IListPayments {
    private paymentRepo;
    constructor({ paymentRepo }: {
        paymentRepo: PaymentRepository;
    });
    execute(): Promise<Payment[]>;
}
//# sourceMappingURL=listPayments.d.ts.map