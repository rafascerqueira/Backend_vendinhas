"use strict";

const {
  Sale,
  SaleProduct,
  Product,
  Customer
} = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    const customers = await Sale.findAll({
      include: [{
        model: Customer,
        as: "customer",
        attributes: [["fullname", "name"]]
      }]
    });
    return res.json(customers);
  },

  async shopStore(req, res) {
    const customerId = req.params.id;
    const invoice = await Sale.create({
      customerId
    });
    return res.json(invoice);
  },

  async cart(req, res) {
    const saleId = req.params.id;
    const product = req.body;
    let amount = await Product.findOne({
      where: {
        id: product.id
      },
      attributes: ["price"]
    }).then(data => data.get("price")).then(value => (value * product.count).toFixed(2)).catch(e => {
      e;
    });
    let addCart = await SaleProduct.create({
      saleId,
      productId: product.id,
      quantity: product.count,
      amount
    });
    return res.json(addCart);
  },

  async showCart(req, res) {
    const opt = req.params; // The code below deserve best pratice,
    // 2 queries is not good but I'll not find the best way to clean this

    const itemCart = await SaleProduct.findAll({
      include: [{
        model: Product
      }],
      where: {
        saleId: opt.id
      }
    });
    const saleCart = await Sale.findOne({
      where: {
        id: opt.id
      }
    });
    return res.json({
      saleCart,
      itemCart
    });
  }

};
//# sourceMappingURL=shopHandler.js.map