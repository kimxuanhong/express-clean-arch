import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { UpdateUser as IUpdateUser, UpdateUserData } from '../../types';
export declare class UpdateUser implements IUpdateUser {
    private userRepo;
    constructor({ userRepo }: {
        userRepo: UserRepository;
    });
    execute({ id, data }: {
        id: string;
        data: UpdateUserData;
    }): Promise<User>;
}
//# sourceMappingURL=updateUser.d.ts.map