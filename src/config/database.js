require("dotenv").config();
module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PSWD,
    database: "vendinhas_dev",
    host: process.env.PG_HOST,
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PSWD,
    database: "vendinhas_test",
    host: process.env.PG_HOST,
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PSWD,
    database: "vendinhas_production",
    host: process.env.PG_HOST,
    dialect: "postgres",
    operatorsAliases: false
  }
};
