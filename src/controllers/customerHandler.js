const { Customer } = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    const customers = await Customer.findAll();

    return res.json(customers);
  },

  async store(req, res) {
    const { name, email } = req.body;

    try {
      const customer = await Customer.create({ name, email });
      return res.status(201).json(customer);
    } catch (error) {
      return res.status(404).json(error);
    }
  },
};
