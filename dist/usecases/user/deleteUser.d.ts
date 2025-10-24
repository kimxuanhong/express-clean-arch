import { UserRepository } from '../../domain/repositories/userRepository';
import { DeleteUser as IDeleteUser } from '../../types';
export declare class DeleteUser implements IDeleteUser {
    private userRepo;
    constructor({ userRepo }: {
        userRepo: UserRepository;
    });
    execute({ id }: {
        id: string;
    }): Promise<void>;
}
//# sourceMappingURL=deleteUser.d.ts.map