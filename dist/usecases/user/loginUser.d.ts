import { UserRepository } from '../../domain/repositories/userRepository';
import { LoginUser as ILoginUser, LoginData, LoginResult } from '../../types';
export declare class LoginUser implements ILoginUser {
    private userRepo;
    private generateToken;
    constructor({ userRepo, generateToken }: {
        userRepo: UserRepository;
        generateToken: (userId: string, email: string) => string;
    });
    execute({ email, password }: LoginData): Promise<LoginResult>;
}
//# sourceMappingURL=loginUser.d.ts.map