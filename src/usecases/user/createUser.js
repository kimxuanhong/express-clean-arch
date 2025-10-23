const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

class CreateUser {
    constructor({userRepo}) {
        this.userRepo = userRepo;
    }

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
