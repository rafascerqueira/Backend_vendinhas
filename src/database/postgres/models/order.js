"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
      });
      Order.hasOne(models.Invoice, {
        foreignKey: "order_id",
      });
      Order.belongsToMany(models.Product, {
        foreignKey: "product_id",
        through: models.Order_items,
      });
    }
  }
  Order.init(
    {
      customer_id: DataTypes.UUID,
      total_amount: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
