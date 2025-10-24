import { Request, Response, NextFunction } from 'express';
import { OrderControllerDependencies } from '../../types';
export declare class OrderController {
    private createOrder;
    private getOrder;
    private listOrders;
    constructor(deps: OrderControllerDependencies);
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    list(_req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=orderController.d.ts.map