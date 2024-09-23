'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const drugTypes = await queryInterface.sequelize.query('SELECT id FROM drug_type');
    const drugTypeIds = drugTypes.map(type => type.id);
    console.log(drugTypeIds);

    let drugs = [
      { id: 1, name: 'Ketorolac Sublingual 100ml', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Ibuprofeno 600ml', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Rifocina', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() }
    ]
    return queryInterface.bulkInsert('drug', drugs, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('drug', null, {});
  }
};