"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userHandler = require("../controllers/userHandler");

var _customerHandler = require("../controllers/customerHandler");

var _productHandler = require("../controllers/productHandler");

var _orderHandler = require("../controllers/orderHandler");

var _shopHandler = require("../controllers/shopHandler");

var _auth = require("./auth");

var _passport = _interopRequireDefault(require("./passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = _express.default.Router();

const auth = (0, _passport.default)();
routes.post("/signup", _userHandler.save);
routes.post("/signin", _auth.signin);
routes.post("/validate", _auth.validateToken);
routes.route("/users").all(auth.authenticate()).get(_userHandler.getUser);
routes.route("/users/:id").all(auth.authenticate()).get(_userHandler.getUser).put(_userHandler.updateUser).delete(_userHandler.deleteUser);
routes.route("/customer").all(auth.authenticate()).get(_customerHandler.index).post(_customerHandler.store);
routes.route("/product").all(auth.authenticate()).get(_productHandler.index).post(_productHandler.store).put(_productHandler.update);
routes.route("/order").all(auth.authenticate()).get(_orderHandler.index).post(_orderHandler.store).put(_orderHandler.update);
routes.route("/sale").all(auth.authenticate()).get(_shopHandler.index).post(_shopHandler.store);
var _default = routes;
exports.default = _default;
//# sourceMappingURL=routes.js.map