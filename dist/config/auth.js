"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    hashSaltRounds: 10,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d",
        privateKey: process.env.PRIVATE_KEY,
        publicKey: process.env.PUBLIC_KEY,
    },
};
//# sourceMappingURL=auth.js.map