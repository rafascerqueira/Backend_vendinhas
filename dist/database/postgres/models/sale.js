"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    date: DataTypes.DATE,
    customerId: DataTypes.INTEGER
  }, {});

  Sale.associate = function (models) {
    // associations can be defined here
    Sale.belongsTo(models.Customer, {
      foreignKey: "customerId",
      as: "customer"
    });
    Sale.belongsToMany(models.Product, {
      foreignKey: "saleId",
      through: "Sale_product",
      as: "items"
    });
  };

  return Sale;
};
//# sourceMappingURL=sale.js.map