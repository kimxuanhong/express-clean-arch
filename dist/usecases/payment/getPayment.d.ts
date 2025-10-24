import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { Payment } from '../../domain/entities/payment';
import { GetPayment as IGetPayment } from '../../types';
export declare class GetPayment implements IGetPayment {
    private paymentRepo;
    constructor({ paymentRepo }: {
        paymentRepo: PaymentRepository;
    });
    execute({ id }: {
        id: string;
    }): Promise<Payment>;
}
//# sourceMappingURL=getPayment.d.ts.map