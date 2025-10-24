import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import { CreateUserData } from '../../domain/types';
import { CreateUser as ICreateUser } from './types';

/**
 * @fileoverview CreateUser Use Case - Handles user registration business logic
 */

/**
 * CreateUser Use Case
 * @class
 * @description Handles the business logic for creating a new user with password hashing
 */
export class CreateUser implements ICreateUser {
  private userRepo: UserRepository;

  /**
   * Creates a CreateUser use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ userRepo }: { userRepo: UserRepository }) {
    this.userRepo = userRepo;
  }

  /**
   * Executes user creation
   * @async
   * @param params - Input parameters
   * @returns Promise<User> Created user object
   * @throws Error If validation fails
   */
  async execute({ name, email, password }: CreateUserData): Promise<User> {
    if (!name || !email) {
      throw new Error('name and email required');
    }
    
    // Check if user already exists
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password if provided
    let hashedPassword: string | undefined = undefined;
    if (password) {
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }
    
    const id = uuidv4();
    const user = new User({
      id, 
      name, 
      email, 
      password: hashedPassword || undefined,
      createdAt: new Date()
    });
    
    return await this.userRepo.create(user);
  }
}
