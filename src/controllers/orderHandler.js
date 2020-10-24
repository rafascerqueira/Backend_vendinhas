const { Customer, Order } = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    const order = await Order.findAll();

    return res.json(order);
  },

  async store(req, res) {
    const id = req.body.id;

    try {
      const hasCustomer = await Customer.findAll({ where: { id } });

      if (hasCustomer.length < 1) throw "Error, cannot find customer.";

      const order = await Order.create({ customer_id: id });
      return res.status(201).json(order);
    } catch (error) {
      return res.status(404).json(error);
    }
  },

  async update(req, res) {
    const { id, status } = req.body;

    try {
      const order = await Order.findOne({ where: { id } });
      if (order === null) throw "Error, purchase order do not exists.";

      const updtOrder = await Order.update({ status }, { where: { id } });

      return res.json(updtOrder);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
