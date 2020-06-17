"use strict";

require("dotenv").config();

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PSWD,
    database: process.env.PG_DBNM,
    host: process.env.PG_HOST,
    dialect: "postgres"
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PSWD,
    database: "vendinhas_test",
    host: process.env.PG_HOST,
    dialect: "postgres"
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PSWD,
    database: process.env.PG_DBNM,
    host: process.env.PG_HOST,
    dialect: "postgres"
  }
};
//# sourceMappingURL=database.js.map