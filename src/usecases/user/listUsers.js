class ListUsers {
    constructor({userRepo}) {
        this.userRepo = userRepo;
    }

    async execute() {
        return this.userRepo.findAll();
    }
}

module.exports = ListUsers;
