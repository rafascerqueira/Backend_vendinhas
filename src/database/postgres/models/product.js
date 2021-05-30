"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasOne(models.Inventory, {
        foreignKey: "product_id",
        as: "product",
      });
      Product.belongsToMany(models.Order, {
        foreignKey: "order_id",
        through: models.Order_items,
      });
    }
  }
  Product.init(
    {
      code: DataTypes.INTEGER,
      name: DataTypes.STRING,
      unit: DataTypes.STRING,
      size: DataTypes.STRING,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
