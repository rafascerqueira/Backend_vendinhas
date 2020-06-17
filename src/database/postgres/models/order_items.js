'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_items = sequelize.define('Order_items', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Order_items.associate = function(models) {
    // associations can be defined here
  };
  return Order_items;
};