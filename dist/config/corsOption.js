"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    origin: process.env.BASEURL,
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=corsOption.js.map