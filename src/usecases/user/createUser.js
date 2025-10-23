const {v4: uuidv4} = require('uuid');

class CreateUser {
    constructor({userRepo}) {
        this.userRepo = userRepo;
    }

    async execute({name, email}) {
        if (!name || !email) throw new Error('name and email required');
        const id = uuidv4();
        const user = await this.userRepo.create({id, name, email, createdAt: new Date()});
        return user;
    }
}

module.exports = CreateUser;
