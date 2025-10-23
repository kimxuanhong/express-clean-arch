/**
 * @fileoverview User Controller - Handles HTTP requests for user operations
 */

/**
 * UserController - HTTP request handler for user management
 * @class
 * @description Handles user-related HTTP requests (CRUD operations and authentication)
 */
class UserController {
    /**
     * Creates a UserController instance
     * @constructor
     * @param {{
     *   createUser: CreateUser,
     *   getUser: GetUser,
     *   listUsers: ListUsers,
     *   updateUser: UpdateUser,
     *   deleteUser: DeleteUser,
     *   loginUser: LoginUser
     * }} deps - Use case dependencies
     */
    constructor({createUser, getUser, listUsers, updateUser, deleteUser, loginUser}) {
        this.createUser = createUser;
        this.getUser = getUser;
        this.listUsers = listUsers;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
        this.loginUser = loginUser;
    }

    /**
     * Creates a new user
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async create(req, res, next) {
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
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async list(req, res, next) {
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
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async get(req, res, next) {
        try {
            const user = await this.getUser.execute({id: req.params.id});
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Updates a user
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async update(req, res, next) {
        try {
            const user = await this.updateUser.execute({id: req.params.id, data: req.body});
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Deletes a user
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async delete(req, res, next) {
        try {
            await this.deleteUser.execute({id: req.params.id});
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    /**
     * Authenticates a user and returns a JWT token
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @returns {Promise<void>}
     */
    async login(req, res, next) {
        try {
            const result = await this.loginUser.execute(req.body);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
