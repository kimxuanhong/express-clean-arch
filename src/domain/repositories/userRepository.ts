import { User, UpdateUserData } from '../types';

/**
 * @fileoverview User Repository Interface - Contract for user data access
 */

/**
 * User Repository Interface
 * @interface
 * @description Defines the contract for user data access operations
 */
export abstract class UserRepository {
  /**
   * Creates a new user
   * @param user - User data
   * @returns Promise<User> - Created user
   */
  abstract create(user: User): Promise<User>;

  /**
   * Finds a user by ID
   * @param id - User ID
   * @returns Promise<User | null> - User or null if not found
   */
  abstract findById(id: string): Promise<User | null>;

  /**
   * Finds a user by email
   * @param email - User email
   * @returns Promise<User | null> - User or null if not found
   */
  abstract findByEmail(email: string): Promise<User | null>;

  /**
   * Retrieves all users
   * @returns Promise<User[]> - Array of users
   */
  abstract findAll(): Promise<User[]>;

  /**
   * Updates a user
   * @param id - User ID
   * @param data - Update data
   * @returns Promise<User> - Updated user
   */
  abstract update(id: string, data: UpdateUserData): Promise<User>;

  /**
   * Deletes a user
   * @param id - User ID
   * @returns Promise<void>
   */
  abstract delete(id: string): Promise<void>;
}
