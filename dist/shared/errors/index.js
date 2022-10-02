"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("./AppError");
function handleErrors(error, request, response, next) {
    if (error instanceof AppError_1.AppError) {
        return response.status(error.statusCode).json({ message: error.message });
    }
    return response.status(500).json({
        status: "Error",
        message: `Internal Server Error - ${error.message}`,
    });
}
exports.default = handleErrors;
//# sourceMappingURL=index.js.map