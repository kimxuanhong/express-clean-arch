class UserController {
    constructor({createUser, getUser, listUsers, updateUser, deleteUser}) {
        this.createUser = createUser;
        this.getUser = getUser;
        this.listUsers = listUsers;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
    }

    async create(req, res, next) {
        try {
            const user = await this.createUser.execute(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    async list(req, res, next) {
        try {
            const users = await this.listUsers.execute();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async get(req, res, next) {
        try {
            const user = await this.getUser.execute({id: req.params.id});
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const user = await this.updateUser.execute({id: req.params.id, data: req.body});
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await this.deleteUser.execute({id: req.params.id});
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
