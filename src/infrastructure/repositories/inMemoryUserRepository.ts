import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { UpdateUserData } from '../../domain/types';

/**
 * @fileoverview In-Memory User Repository - In-memory implementation of user repository
 */

/**
 * In-Memory User Repository
 * @class
 * @description In-memory implementation of user repository for development/testing
 */
export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  /**
   * Creates a new user
   * @param user - User data
   * @returns Promise<User> - Created user
   */
  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  /**
   * Finds a user by ID
   * @param id - User ID
   * @returns Promise<User | null> - User or null if not found
   */
  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  /**
   * Finds a user by email
   * @param email - User email
   * @returns Promise<User | null> - User or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  /**
   * Retrieves all users
   * @returns Promise<User[]> - Array of users
   */
  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  /**
   * Updates a user
   * @param id - User ID
   * @param data - Update data
   * @returns Promise<User> - Updated user
   */
  async update(id: string, data: UpdateUserData): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) {
      throw new Error('User not found');
    }
    
    const updated = new User({
      ...existing,
      ...data
    });
    
    this.users.set(id, updated);
    return updated;
  }

  /**
   * Deletes a user
   * @param id - User ID
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new Error('User not found');
    }
    this.users.delete(id);
  }
}
