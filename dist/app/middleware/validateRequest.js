"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = handleValidationErrors;
const express_validator_1 = require("express-validator");
function handleValidationErrors(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: 'path' in err ? err.path : 'unknown',
                message: err.msg
            }))
        });
        return;
    }
    next();
}
//# sourceMappingURL=validateRequest.js.map