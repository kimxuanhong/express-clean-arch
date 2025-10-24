import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { ListUsers as IListUsers } from './types';

/**
 * @fileoverview ListUsers Use Case - Handles user listing business logic
 */

/**
 * ListUsers Use Case
 * @class
 * @description Handles the business logic for retrieving all users
 */
export class ListUsers implements IListUsers {
  private userRepo: UserRepository;

  /**
   * Creates a ListUsers use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ userRepo }: { userRepo: UserRepository }) {
    this.userRepo = userRepo;
  }

  /**
   * Executes user listing
   * @async
   * @returns Promise<User[]> Array of users
   */
  async execute(): Promise<User[]> {
    return await this.userRepo.findAll();
  }
}
