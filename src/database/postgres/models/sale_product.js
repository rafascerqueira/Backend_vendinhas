'use strict';
module.exports = (sequelize, DataTypes) => {
  const sale_product = sequelize.define('sale_product', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.FLOAT
  }, {});
  sale_product.associate = function(models) {
    // associations can be defined here
  };
  return sale_product;
};