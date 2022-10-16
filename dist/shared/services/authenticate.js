"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
/**
 * Middleware which check authorization to access some routes. Will handle exceptions connection and watch valid of tokens
 */
exports.default = (request, response, next) => {
    const handleAuthError = (name, message) => {
        response.status(401).json({ error: { name, message } });
    };
    const authHeader = request.headers["authorization"];
    if (!authHeader)
        return handleAuthError("AuthHeaderError", "Please, sign in to granted access");
    try {
        const token = authHeader.split(" ")[1];
        if (!token)
            return handleAuthError("UnsetTokenError", "There is no token provided");
        (0, token_1.verify)(token);
    }
    catch (error) {
        return response.status(401).json({ error });
    }
    next();
};
//# sourceMappingURL=authenticate.js.map