import { User as IUser } from '../../types';
export declare class User implements IUser {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly password?: string | undefined;
    readonly createdAt: Date;
    constructor({ id, name, email, password, createdAt }: IUser);
}
//# sourceMappingURL=user.d.ts.map