'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let drugs = [
      {id: 1, name: 'Ketorolac Sublingual 100ml', drugTypeId: null, createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Ibuprofeno 600ml', drugTypeId: null, createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Rifocina', drugTypeId: null, createdAt: new Date(), updatedAt: new Date()}
    ]
    return queryInterface.bulkInsert('drug', drugs, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('drug', null, {});
  }
};