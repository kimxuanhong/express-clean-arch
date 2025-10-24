import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { GetUser as IGetUser } from './types';

/**
 * @fileoverview GetUser Use Case - Handles user retrieval business logic
 */

/**
 * GetUser Use Case
 * @class
 * @description Handles the business logic for retrieving a user by ID
 */
export class GetUser implements IGetUser {
  private userRepo: UserRepository;

  /**
   * Creates a GetUser use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ userRepo }: { userRepo: UserRepository }) {
    this.userRepo = userRepo;
  }

  /**
   * Executes user retrieval
   * @async
   * @param params - Input parameters
   * @returns Promise<User> User object
   * @throws Error If user not found
   */
  async execute({ id }: { id: string }): Promise<User> {
    if (!id) {
      throw new Error('id required');
    }
    
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    
    return user;
  }
}
