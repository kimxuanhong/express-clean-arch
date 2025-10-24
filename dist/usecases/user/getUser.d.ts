import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { GetUser as IGetUser } from '../../types';
export declare class GetUser implements IGetUser {
    private userRepo;
    constructor({ userRepo }: {
        userRepo: UserRepository;
    });
    execute({ id }: {
        id: string;
    }): Promise<User>;
}
//# sourceMappingURL=getUser.d.ts.map