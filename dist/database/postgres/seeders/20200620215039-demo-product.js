"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", [{
      name: "Footworks",
      unit: "un",
      size: "30ml",
      price: 16.9,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  }
};
//# sourceMappingURL=20200620215039-demo-product.js.map