import { User, UpdateUserData } from '../types';

/**
 * @fileoverview User Repository Interface - Contract for user data access
 */

/**
 * User Repository Interface
 * @interface
 * @description Defines the contract for user data access operations
 */
export interface UserRepository {
  /**
   * Creates a new user
   * @param user - User data
   * @returns Promise<User> - Created user
   */
  create(user: User): Promise<User>;

  /**
   * Finds a user by ID
   * @param id - User ID
   * @returns Promise<User | null> - User or null if not found
   */
  findById(id: string): Promise<User | null>;

  /**
   * Finds a user by email
   * @param email - User email
   * @returns Promise<User | null> - User or null if not found
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Retrieves all users
   * @returns Promise<User[]> - Array of users
   */
  findAll(): Promise<User[]>;

  /**
   * Updates a user
   * @param id - User ID
   * @param data - Update data
   * @returns Promise<User> - Updated user
   */
  update(id: string, data: UpdateUserData): Promise<User>;

  /**
   * Deletes a user
   * @param id - User ID
   * @returns Promise<void>
   */
  delete(id: string): Promise<void>;
}
