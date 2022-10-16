"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
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