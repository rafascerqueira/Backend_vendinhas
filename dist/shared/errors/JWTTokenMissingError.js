"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTTokenMissingError = void 0;
const AppError_1 = require("./AppError");
class JWTTokenMissingError extends AppError_1.AppError {
    constructor() {
        super("Oops! we don't have a Token.", 401);
    }
}
exports.JWTTokenMissingError = JWTTokenMissingError;
//# sourceMappingURL=JWTTokenMissingError.js.map