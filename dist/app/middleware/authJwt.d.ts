import { Request, Response, NextFunction } from 'express';
declare const JWT_SECRET: string;
export declare const verifyToken: (req: Request, res: Response, next: NextFunction) => void;
export declare const generateToken: (userId: string, userEmail: string) => string;
export { JWT_SECRET };
//# sourceMappingURL=authJwt.d.ts.map