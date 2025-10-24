import { Request, Response, NextFunction } from 'express';
import { UserControllerDependencies } from '../../types';
export declare class UserController {
    private createUser;
    private getUser;
    private listUsers;
    private updateUser;
    private deleteUser;
    private loginUser;
    constructor(deps: UserControllerDependencies);
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    list(_req: Request, res: Response, next: NextFunction): Promise<void>;
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=userController.d.ts.map