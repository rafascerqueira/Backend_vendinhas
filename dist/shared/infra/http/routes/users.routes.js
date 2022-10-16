"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("@modules/users/controllers/CreateUserController");
const AuthenticateUserController_1 = require("@modules/users/controllers/AuthenticateUserController");
const ShowUserController_1 = require("@modules/users/controllers/ShowUserController");
const usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
const createUserController = new CreateUserController_1.CreateUserController();
const authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController();
const showUserController = new ShowUserController_1.ShowUserController();
usersRoutes.get("/", (_, response) => response.json({ message: "users routes" }));
usersRoutes.post("/signup", createUserController.handle);
usersRoutes.post("/signin", authenticateUserController.handle);
usersRoutes.get("/:id", showUserController.handle);
//# sourceMappingURL=users.routes.js.map