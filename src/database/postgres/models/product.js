"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      unit: DataTypes.STRING,
      size: DataTypes.STRING,
      price: DataTypes.FLOAT
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.Sale, {
      foreignKey: "saleId",
      through: "SaleProduct",
      as: "sales"
    });
  };
  return Product;
};
