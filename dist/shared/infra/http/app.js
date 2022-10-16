"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
const errors_1 = __importDefault(require("@shared/errors"));
const corsOption_1 = __importDefault(require("@config/corsOption"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOption_1.default));
app.use(routes_1.routes);
app.use(errors_1.default);
//# sourceMappingURL=app.js.map