"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAAuthentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("@config/auth"));
const JWTTokenMissingError_1 = require("@shared/errors/JWTTokenMissingError");
const JWTInvalidTokenError_1 = require("@shared/errors/JWTInvalidTokenError");
function ensureAAuthentication(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new JWTTokenMissingError_1.JWTTokenMissingError();
        }
        const [, token] = authHeader.split(" ");
        try {
            const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
            request.user = {
                id: user_id,
            };
            next();
        }
        catch (_a) {
            throw new JWTInvalidTokenError_1.JWTInvalidTokenError();
        }
    });
}
exports.ensureAAuthentication = ensureAAuthentication;
//# sourceMappingURL=ensureAuthentication.js.map