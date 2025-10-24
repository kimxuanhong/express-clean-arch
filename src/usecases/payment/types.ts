import { 
  Payment,
  CreatePaymentData,
  UpdatePaymentData
} from '../../domain/types';

// Payment use case interfaces
export interface CreatePayment {
  execute(data: CreatePaymentData): Promise<Payment>;
}

export interface GetPayment {
  execute(params: { id: string }): Promise<Payment>;
}

export interface ListPayments {
  execute(): Promise<Payment[]>;
}

export interface UpdatePayment {
  execute(params: { id: string; data: UpdatePaymentData }): Promise<Payment>;
}
