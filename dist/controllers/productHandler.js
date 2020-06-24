"use strict";

const {
  Product
} = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    try {
      const prod = await Product.findAll();
      return res.json(prod);
    } catch (error) {
      return res.json(error);
    }
  },

  async store(req, res) {
    const {
      name,
      unit,
      size,
      price
    } = req.body;
    const prod = await Product.create({
      name,
      unit,
      size,
      price
    });
    return res.json(prod);
  }

};
//# sourceMappingURL=productHandler.js.map