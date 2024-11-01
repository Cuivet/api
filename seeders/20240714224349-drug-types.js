"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    let drugType = [
      { id: 1, name: "Antibiotico", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Vacuna", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: "Desparacitante", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: "Analgésico", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: "Anti-inflamatorio", createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: "Antiparasitario Externo", createdAt: new Date(), updatedAt: new Date() }
    ];
    return queryInterface.bulkInsert("drug_type", drugType, {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('drug_type', null, {}); 
  },
};
