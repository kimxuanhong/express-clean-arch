import { UserRepository } from '../../domain/repositories/userRepository';
import { DeleteUser as IDeleteUser } from './types';

/**
 * @fileoverview DeleteUser Use Case - Handles user deletion business logic
 */

/**
 * DeleteUser Use Case
 * @class
 * @description Handles the business logic for deleting a user
 */
export class DeleteUser implements IDeleteUser {
  private userRepo: UserRepository;

  /**
   * Creates a DeleteUser use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ userRepo }: { userRepo: UserRepository }) {
    this.userRepo = userRepo;
  }

  /**
   * Executes user deletion
   * @async
   * @param params - Input parameters
   * @returns Promise<void>
   * @throws Error If user not found
   */
  async execute({ id }: { id: string }): Promise<void> {
    if (!id) {
      throw new Error('id required');
    }
    
    // Check if user exists
    const existingUser = await this.userRepo.findById(id);
    if (!existingUser) {
      throw new Error('user not found');
    }
    
    await this.userRepo.delete(id);
  }
}
