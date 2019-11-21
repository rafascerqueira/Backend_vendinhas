"use strict";

const {
  Customer
} = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    const customers = await Customer.findAll();
    return res.json(customers);
  },

  async store(req, res) {
    const {
      fullname,
      email
    } = req.body;
    const customer = await Customer.create({
      fullname,
      email
    });
    return res.json(customer);
  }

};
//# sourceMappingURL=customerHandler.js.map