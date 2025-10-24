import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { UpdateUserData } from '../../types';
export declare class InMemoryUserRepository extends UserRepository {
    private users;
    constructor();
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, data: UpdateUserData): Promise<User>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=inMemoryUserRepository.d.ts.map