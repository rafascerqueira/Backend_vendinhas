"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      unit: DataTypes.STRING,
      size: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
    },
    {}
  );
  Product.associate = function (models) {
    Product.hasOne(models.Inventory, {
      foreignKey: "product_id",
      as: "product",
    });
    Product.belongsToMany(models.Order, {
      foreignKey: "order_id",
      through: models.Order_items,
    });
  };
  return Product;
};
