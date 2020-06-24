"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      customer_id: DataTypes.INTEGER,
      total_amount: DataTypes.DECIMAL(10, 2),
      status: DataTypes.BOOLEAN,
    },
    {}
  );
  Order.associate = function (models) {
    Order.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
    Order.hasOne(models.Invoice);
    Order.belongsToMany(models.Product, {
      foreignKey: "product_id",
      through: models.Order_items,
    });
  };
  return Order;
};
