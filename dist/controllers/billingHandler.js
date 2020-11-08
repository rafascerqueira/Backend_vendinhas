"use strict";

const {
  Invoice,
  Order,
  Customer
} = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    try {
      const bill = await Invoice.findAll({
        include: [{
          model: Order,
          include: [{
            model: Customer
          }]
        }]
      });
      return res.json(bill);
    } catch (error) {
      return res.json(error);
    }
  },

  async showSelectedBills(req, res) {
    const {
      invoiced
    } = req.body;

    try {
      const bills = await Invoice.findAll({
        include: [{
          model: Order,
          include: [{
            model: Customer
          }]
        }],
        where: {
          invoiced
        }
      });
      return res.json(bills);
    } catch (error) {
      return res.status(404).json(error);
    }
  },

  async store(req, res) {
    const {
      id
    } = req.body;

    try {
      const hasOrder = await Order.findAll({
        where: {
          id
        }
      });
      if (hasOrder.length < 1) throw "Error, cannot find Order.";
      const invoice = await Invoice.create({
        order_id: id,
        invoiced: false
      });
      return res.status(201).json(invoice);
    } catch (error) {
      return res.status(404).json(error);
    }
  },

  async update(req, res) {
    const {
      id,
      invoiced
    } = req.body;

    try {
      const paid = await Invoice.update({
        invoiced
      }, {
        where: {
          id
        }
      });
      return res.json(paid);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

};
//# sourceMappingURL=billingHandler.js.map