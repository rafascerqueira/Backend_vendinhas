'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    date: DataTypes.DATE,
    customerId: DataTypes.INTEGER
  }, {});

  Sale.associate = function (models) {// associations can be defined here
  };

  return Sale;
};
//# sourceMappingURL=sale.js.map