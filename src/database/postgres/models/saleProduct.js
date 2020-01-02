"use strict";
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      amount: DataTypes.FLOAT
    },
    {}
  );
  SaleProduct.associate = function(models) {
    // associations can be defined here
    SaleProduct.belongsTo(models.Sale, { foreignKey: "saleId" });
    SaleProduct.belongsTo(models.Product, { foreignKey: "productId" });
  };
  return SaleProduct;
};
