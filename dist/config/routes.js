"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userHandler = require("../controllers/userHandler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = _express.default.Router(); // Register routes


routes.post("/signup", _userHandler.save);
routes.route("/users").all(_userHandler.getUser);
routes.route("/users/:id").get(_userHandler.getUser).put(_userHandler.updateUser).delete(_userHandler.deleteUser);
var _default = routes;
exports.default = _default;
//# sourceMappingURL=routes.js.map