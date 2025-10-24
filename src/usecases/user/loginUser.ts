import bcrypt from 'bcryptjs';
import { UserRepository } from '../../domain/repositories/userRepository';
import { LoginUser as ILoginUser } from './types';
import { LoginData, LoginResult } from '../../domain/types';

/**
 * @fileoverview LoginUser Use Case - Handles user authentication
 */

/**
 * LoginUser Use Case
 * @class
 * @description Handles user authentication and JWT token generation
 */
export class LoginUser implements ILoginUser {
  private userRepo: UserRepository;
  private generateToken: (userId: string, email: string) => string;

  /**
   * Creates a LoginUser use case instance
   * @constructor
   * @param deps - Dependencies
   */
  constructor({ 
    userRepo, 
    generateToken 
  }: { 
    userRepo: UserRepository;
    generateToken: (userId: string, email: string) => string;
  }) {
    this.userRepo = userRepo;
    this.generateToken = generateToken;
  }

  /**
   * Executes user login
   * @async
   * @param params - Login credentials
   * @returns Promise<LoginResult> JWT token and user object
   * @throws Error If credentials invalid or user not found
   */
  async execute({ email, password }: LoginData): Promise<LoginResult> {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user by email
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare passwords
    if (!user.password) {
      throw new Error('User has no password set');
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = this.generateToken(user.id, user.email);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };
  }
}
