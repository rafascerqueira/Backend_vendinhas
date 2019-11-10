"use strict";

const Sequelize = require("sequelize");

const dbConfig = require("../config/database");

const Customer = require("../models/Customer");

const connection = new Sequelize(dbConfig);
Customer.init(connection);
module.exports = connection;
//# sourceMappingURL=postgres.js.map