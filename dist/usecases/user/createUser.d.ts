import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { CreateUserData, CreateUser as ICreateUser } from '../../types';
export declare class CreateUser implements ICreateUser {
    private userRepo;
    constructor({ userRepo }: {
        userRepo: UserRepository;
    });
    execute({ name, email, password }: CreateUserData): Promise<User>;
}
//# sourceMappingURL=createUser.d.ts.map