'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let hairLengths = [
      {id: 1, name: 'Corto', description:'De 1 a 4 cm', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Medio', description:'De 4 a 6 cm', createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Largo', description:'Más de 6 cm', createdAt: new Date(), updatedAt: new Date()},
      {id: 4, name: 'Sin pelo', description:'0 cm', createdAt: new Date(), updatedAt: new Date()},

    ]
    return queryInterface.bulkInsert('hair_length', hairLengths, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hair_length', null, {});
  }
};