'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale_product = sequelize.define('Sale_product', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.FLOAT
  }, {});

  Sale_product.associate = function (models) {// associations can be defined here
  };

  return Sale_product;
};
//# sourceMappingURL=sale_product.js.map