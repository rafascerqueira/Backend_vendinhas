"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("@config/auth"));
const sign = (user) => {
    const payload = { id: user.id, role: user.role };
    return jsonwebtoken_1.default.sign(payload, auth_1.default.jwt.privateKey, {
        algorithm: "RS256",
        expiresIn: "15m",
    });
};
exports.sign = sign;
const decode = (token) => jsonwebtoken_1.default.decode(token);
exports.decode = decode;
const verify = (token) => jsonwebtoken_1.default.verify(token, auth_1.default.jwt.publicKey, (err, data) => {
    if (err)
        throw err;
    return data;
});
exports.verify = verify;
//# sourceMappingURL=token.js.map