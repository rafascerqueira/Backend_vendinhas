"use strict";

module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define("Inventory", {
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});

  Inventory.associate = function (models) {
    Inventory.belongsTo(models.Product);
  };

  return Inventory;
};
//# sourceMappingURL=inventory.js.map