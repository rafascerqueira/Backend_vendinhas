"use strict";

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  Customer.associate = function (models) {
    // associations can be defined here
    Customer.hasMany(models.Order, {
      foreignKey: "customer_id",
      as: "orders"
    });
  };

  return Customer;
};
//# sourceMappingURL=customer.js.map