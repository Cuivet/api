'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let hairColors = [
      {id: 1, name: 'Negro', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Blanco', createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Chocolate', createdAt: new Date(), updatedAt: new Date()},
      {id: 4, name: 'Amarillo', createdAt: new Date(), updatedAt: new Date()},
      {id: 5, name: 'Gris', createdAt: new Date(), updatedAt: new Date()},
      {id: 6, name: 'Dorado', createdAt: new Date(), updatedAt: new Date()},
      {id: 7, name: 'Sin color', createdAt: new Date(), updatedAt: new Date()},

    ]
    return queryInterface.bulkInsert('hair_color', hairColors, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hair_color', null, {});
  }
};