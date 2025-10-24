import { Request, Response, NextFunction } from 'express';
import { UserControllerDependencies } from './types';

/**
 * @fileoverview User Controller - Handles HTTP requests for user operations
 */

/**
 * UserController - HTTP request handler for user management
 * @class
 * @description Handles user-related HTTP requests (CRUD operations and authentication)
 */
export class UserController {
  private createUser: UserControllerDependencies['createUser'];
  private getUser: UserControllerDependencies['getUser'];
  private listUsers: UserControllerDependencies['listUsers'];
  private updateUser: UserControllerDependencies['updateUser'];
  private deleteUser: UserControllerDependencies['deleteUser'];
  private loginUser: UserControllerDependencies['loginUser'];

  /**
   * Creates a UserController instance
   * @constructor
   * @param deps - Use case dependencies
   */
  constructor(deps: UserControllerDependencies) {
    this.createUser = deps.createUser;
    this.getUser = deps.getUser;
    this.listUsers = deps.listUsers;
    this.updateUser = deps.updateUser;
    this.deleteUser = deps.deleteUser;
    this.loginUser = deps.loginUser;
  }

  /**
   * Creates a new user
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.createUser.execute(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retrieves all users
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.listUsers.execute();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retrieves a user by ID
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'];
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      const user = await this.getUser.execute({ id });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a user
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'];
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      const user = await this.updateUser.execute({ id, data: req.body });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a user
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'];
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      await this.deleteUser.execute({ id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  /**
   * Authenticates a user and returns a JWT token
   * @async
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next middleware function
   * @returns Promise<void>
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.loginUser.execute(req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
