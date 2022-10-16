"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = require("./app");
(0, dotenv_1.config)();
const port = process.env.PORT;
app_1.app.listen(port, () => console.log(`Server is running at port: ${port}`));
//# sourceMappingURL=server.js.map