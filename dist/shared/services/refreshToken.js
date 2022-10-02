"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshTokenData = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("@config/auth"));
const createRefreshTokenData = (token, user) => {
    const { id } = user;
    const payload = {
        user_id: id,
        token,
    };
    const refreshToken = jsonwebtoken_1.default.sign(payload, auth_1.default.jwt.privateKey, {
        algorithm: "RS256",
        expiresIn: "7d",
    });
    return refreshToken;
};
exports.createRefreshTokenData = createRefreshTokenData;
//# sourceMappingURL=refreshToken.js.map