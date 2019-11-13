"use strict";

const Sequelize = require("sequelize"); // const dbConfig = require("../config/database");


const Customer = require("../models/Customer"); // const connection = new Sequelize(dbConfig);


const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: true
  }
});
Customer.init(connection);
module.exports = connection;
//# sourceMappingURL=postgres.js.map