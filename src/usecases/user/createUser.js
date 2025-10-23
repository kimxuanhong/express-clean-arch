/**
 * @fileoverview CreateUser Use Case - Handles user registration business logic
 */

const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

/**
 * CreateUser Use Case
 * @class
 * @description Handles the business logic for creating a new user with password hashing
 */
class CreateUser {
    /**
     * Creates a CreateUser use case instance
     * @constructor
     * @param {{ userRepo: UserRepository }} deps - Dependencies
     */
    constructor({userRepo}) {
        this.userRepo = userRepo;
    }

    /**
     * Executes user creation
     * @async
     * @param {{ name: string, email: string, password?: string }} params - Input parameters
     * @returns {Promise<User>} Created user object
     * @throws {Error} If validation fails
     */
    async execute({name, email, password}) {
        if (!name || !email) throw new Error('name and email required');
        
        // Hash password if provided
        let hashedPassword = null;
        if (password) {
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }
            hashedPassword = await bcrypt.hash(password, 10);
        }
        
        const id = uuidv4();
        const user = await this.userRepo.create({
            id, 
            name, 
            email, 
            password: hashedPassword,
            createdAt: new Date()
        });
        
        return user;
    }
}

module.exports = CreateUser;
