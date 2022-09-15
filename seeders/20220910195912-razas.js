'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let races = [
      {id: 1, name: 'Labrador', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 2, name: 'Golden', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 3, name: 'Colly', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 4, name: 'Jack Russell', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 5, name: 'Caniche', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 6, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 1},

      {id: 100, name: 'Abisinio', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 101, name: 'Bombay', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 102, name: 'Balinés', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 103, name: 'Persa', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 104, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 2},

      {id: 200, name: 'Canario', createdAt: new Date(), updatedAt: new Date(), specieId: 3},
      {id: 201, name: 'Loro', createdAt: new Date(), updatedAt: new Date(), specieId: 3},
      {id: 202, name: 'Catita', createdAt: new Date(), updatedAt: new Date(), specieId: 3},
      {id: 203, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 3},
    ]
    return queryInterface.bulkInsert('race',races,{} );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('race', null, {});
  }
};