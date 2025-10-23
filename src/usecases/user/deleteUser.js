class DeleteUser {
    constructor({userRepo}) {
        this.userRepo = userRepo;
    }

    async execute({id}) {
        if (!id) throw new Error('id required');
        const deleted = await this.userRepo.delete(id);
        if (!deleted) throw new Error('user not found');
        return deleted;
    }
}

module.exports = DeleteUser;
