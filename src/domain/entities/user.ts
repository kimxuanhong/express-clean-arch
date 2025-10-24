import { User as IUser } from '../types';

/**
 * @fileoverview User Entity - Core business entity representing a user
 */

/**
 * User Entity
 * @class
 * @description Represents a user in the system domain layer
 */
export class User implements IUser {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password?: string | undefined;
  public readonly createdAt: Date;

  /**
   * Creates a User instance
   * @constructor
   * @param userData - User data
   */
  constructor({ id, name, email, password, createdAt = new Date() }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // Should be hashed
    this.createdAt = createdAt;
  }
}
