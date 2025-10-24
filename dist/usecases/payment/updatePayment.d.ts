import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { Payment } from '../../domain/entities/payment';
import { UpdatePayment as IUpdatePayment, UpdatePaymentData } from '../../types';
export declare class UpdatePayment implements IUpdatePayment {
    private paymentRepo;
    constructor({ paymentRepo }: {
        paymentRepo: PaymentRepository;
    });
    execute({ id, data }: {
        id: string;
        data: UpdatePaymentData;
    }): Promise<Payment>;
}
//# sourceMappingURL=updatePayment.d.ts.map