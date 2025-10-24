import { Request, Response, NextFunction } from 'express';
import { PaymentControllerDependencies } from '../../types';
export declare class PaymentController {
    private createPayment;
    private getPayment;
    private listPayments;
    private updatePayment;
    constructor(deps: PaymentControllerDependencies);
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    list(_req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=paymentController.d.ts.map