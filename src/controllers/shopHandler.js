const { Sale, Customer } = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    const customers = await Sale.findAll({
      include: [{ model: Customer, as: "customer", required: true }]
    });

    return res.json(customers);
  },
  async shopStore(req, res) {
    const customerId = req.params.id;

    const invoice = await Sale.create({ customerId });

    return res.json(invoice);
  }
};
