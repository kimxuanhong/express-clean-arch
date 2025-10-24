import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { ListUsers as IListUsers } from '../../types';
export declare class ListUsers implements IListUsers {
    private userRepo;
    constructor({ userRepo }: {
        userRepo: UserRepository;
    });
    execute(): Promise<User[]>;
}
//# sourceMappingURL=listUsers.d.ts.map