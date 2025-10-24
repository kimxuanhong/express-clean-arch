"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = __importDefault(require("./logger"));
const PORT = process.env['PORT'] || 3000;
const app = (0, app_1.makeApp)();
app.listen(PORT, () => {
    logger_1.default.info(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map