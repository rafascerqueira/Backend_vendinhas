const { Invoice, Order, Customer } = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    try {
      const bill = await Invoice.findAll({
        include: [{ model: Order, include: [{ model: Customer }] }],
        where: { invoiced: false },
      });

      return res.json(bill);
    } catch (error) {
      return res.json(error);
    }
  },

  async store(req, res) {
    const { id } = req.body;
    try {
      const hasOrder = await Order.findAll({ where: { id } });
      if (hasOrder.length < 1) throw "Error, cannot find Order.";

      const invoice = await Invoice.create({ order_id: id, invoiced: false });

      return res.json(invoice);
    } catch (error) {
      return res.json(error);
    }
  },

  async update(req, res) {
    const { id, status } = req.body;
    try {
      const paid = await Invoice.update(
        { invoiced: status },
        { where: { id } }
      );
      return res.json(paid);
    } catch (error) {
      return res.json(error);
    }
  },
};