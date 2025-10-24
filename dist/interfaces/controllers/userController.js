"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(deps) {
        this.createUser = deps.createUser;
        this.getUser = deps.getUser;
        this.listUsers = deps.listUsers;
        this.updateUser = deps.updateUser;
        this.deleteUser = deps.deleteUser;
        this.loginUser = deps.loginUser;
    }
    async create(req, res, next) {
        try {
            const user = await this.createUser.execute(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async list(_req, res, next) {
        try {
            const users = await this.listUsers.execute();
            res.json(users);
        }
        catch (err) {
            next(err);
        }
    }
    async get(req, res, next) {
        try {
            const id = req.params['id'];
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const user = await this.getUser.execute({ id });
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params['id'];
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const user = await this.updateUser.execute({ id, data: req.body });
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params['id'];
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            await this.deleteUser.execute({ id });
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            const result = await this.loginUser.execute(req.body);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map