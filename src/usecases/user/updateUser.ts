import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { UpdateUser as IUpdateUser } from './types';
import { UpdateUserData } from '../../domain/types';

/**
 * @fileoverview UpdateUser Use Case - Handles user update business logic
 */

/**
 * UpdateUser Use Case
 * @class
 * @description Handles the business logic for updating a user
 */
export class UpdateUser implements IUpdateUser {
  private userRepo: UserRepository;

  /**
   * Creates an UpdateUser use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ userRepo }: { userRepo: UserRepository }) {
    this.userRepo = userRepo;
  }

  /**
   * Executes user update
   * @async
   * @param params - Input parameters
   * @returns Promise<User> Updated user object
   * @throws Error If user not found
   */
  async execute({ id, data }: { id: string; data: UpdateUserData }): Promise<User> {
    if (!id) {
      throw new Error('id required');
    }
    
    // Check if user exists
    const existingUser = await this.userRepo.findById(id);
    if (!existingUser) {
      throw new Error('user not found');
    }
    
    return await this.userRepo.update(id, data);
  }
}
