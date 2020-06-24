const { Order, Order_items, Product } = require("../database/postgres/models");

module.exports = {
  async index(req, res) {
    const shop = await Order_items.findAll();

    return res.json(shop);
  },

  async store(req, res) {
    const { orderId, productId, quantity } = req.body;

    try {
      const purchase = await Order_items.create({
        order_id: orderId,
        product_id: productId,
        quantity,
      });

      const { price } = await Product.findOne({
        attributes: ["price"],
        where: { id: productId },
      });

      const { total_amount } = await Order.findOne({
        attributes: ["total_amount"],
        where: { id: orderId },
      });

      const amount = parseFloat(total_amount) + price * quantity;

      await Order.update({ total_amount: amount }, { where: { id: orderId } });

      return res.json(purchase);
    } catch (error) {
      return res.json(error);
    }
  },
};
