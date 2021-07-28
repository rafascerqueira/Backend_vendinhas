const { Order, Order_items, Product } = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    const shop = await Order_items.findAll();

    return res.json(shop);
  },

  async store(req, res) {
    const { orderId, productId, quantity, total_amount } = req.body;

    try {
      const purchase = await Order_items.create({
        order_id: orderId,
        product_id: productId,
        quantity,
      });

      await Order.update({ total_amount }, { where: { id: orderId } });

      return res.status(201).json(purchase);
    } catch (error) {
      return res.status(404).json(error);
    }
  },

  async update(req, res) {
    const order = req.body;
  },
};
