"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./config/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 3000;
app.use(_express.default.json());
app.use(_routes.default);
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
//# sourceMappingURL=index.js.map