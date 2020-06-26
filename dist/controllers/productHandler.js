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
  },

  async update(req, res) {
    const {
      id,
      ...rest
    } = req.body;

    try {
      const prod = await Product.findOne({
        where: {
          id
        }
      });
      if (prod === null) throw "Error, this product was not found.";
      const updtProd = await Product.update({ ...rest
      }, {
        where: {
          id
        }
      });
      return res.json(updtProd[0]);
    } catch (error) {
      return res.json(error);
    }
  }

};
//# sourceMappingURL=productHandler.js.map