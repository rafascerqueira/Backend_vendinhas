"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./config/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 3001;
const corsOpts = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cors.default)(corsOpts));
app.use(_routes.default);
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
//# sourceMappingURL=index.js.map