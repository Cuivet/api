'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let petSizes = [
      {id: 1, name: 'Pequeño', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Mediano', createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Grande', createdAt: new Date(), updatedAt: new Date()},
      {id: 4, name: 'Gigante', createdAt: new Date(), updatedAt: new Date()},
    ]
    return queryInterface.bulkInsert('pet_size', petSizes, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pet_size', null, {});
  }
};