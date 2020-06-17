'use strict';

module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});

  Inventory.associate = function (models) {// associations can be defined here
  };

  return Inventory;
};
//# sourceMappingURL=inventory.js.map