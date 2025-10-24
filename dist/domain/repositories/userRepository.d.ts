import { User, UpdateUserData } from '../../types';
export declare abstract class UserRepository {
    abstract create(user: User): Promise<User>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findAll(): Promise<User[]>;
    abstract update(id: string, data: UpdateUserData): Promise<User>;
    abstract delete(id: string): Promise<void>;
}
//# sourceMappingURL=userRepository.d.ts.map