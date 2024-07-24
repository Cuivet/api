"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    let drugType = [
      {
        id: 1,
        name: "Antibiotico",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 2, name: "Vacuna", createdAt: new Date(), updatedAt: new Date() },
      {
        id: 3,
        name: "Desparacitante",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("drug_type", drugType, {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('drug_type', null, {}); 
  },
};
