class UpdateUser {
    constructor({userRepo}) {
        this.userRepo = userRepo;
    }

    async execute({id, data}) {
        if (!id) throw new Error('id required');
        const updated = await this.userRepo.update(id, data);
        if (!updated) throw new Error('user not found');
        return updated;
    }
}

module.exports = UpdateUser;
