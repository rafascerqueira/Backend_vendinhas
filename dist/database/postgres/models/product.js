'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {});

  Product.associate = function (models) {// associations can be defined here
  };

  return Product;
};
//# sourceMappingURL=product.js.map