"use strict";
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      order_id: DataTypes.INTEGER,
      invoiced: DataTypes.BOOLEAN,
    },
    {}
  );
  Invoice.associate = function (models) {
    // associations can be defined here
    Invoice.belongsTo(models.Order, { foreignKey: "order_id" });
  };
  return Invoice;
};
