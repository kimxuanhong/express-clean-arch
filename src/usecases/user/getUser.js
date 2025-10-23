class GetUser {
    constructor({userRepo}) {
        this.userRepo = userRepo;
    }

    async execute({id}) {
        if (!id) throw new Error('id required');
        const user = await this.userRepo.findById(id);
        if (!user) throw new Error('user not found');
        return user;
    }
}

module.exports = GetUser;
