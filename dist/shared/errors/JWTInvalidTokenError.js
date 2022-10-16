"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTInvalidTokenError = void 0;
const AppError_1 = require("./AppError");
class JWTInvalidTokenError extends AppError_1.AppError {
    constructor() {
        super("Ouch! It's a invalid token.", 401);
    }
}
exports.JWTInvalidTokenError = JWTInvalidTokenError;
//# sourceMappingURL=JWTInvalidTokenError.js.map