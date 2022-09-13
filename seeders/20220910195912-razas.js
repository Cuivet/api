'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let races = [
      {name: 'Labrador', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {name: 'Golden', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {name: 'Colly', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {name: 'Jack Russell', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {name: 'Caniche', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {name: 'Abisinio', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {name: 'Bombay', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {name: 'Balinés', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {name: 'Persa', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {name: 'Canario', createdAt: new Date(), updatedAt: new Date(), specieId: "3"},
      {name: 'Loro', createdAt: new Date(), updatedAt: new Date(), specieId: "3"},
      {name: 'Catita', createdAt: new Date(), updatedAt: new Date(), specieId: "3"},
      {name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: "3"},

    ]

    return queryInterface.bulkInsert('race',races,{} );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Race', null, {});
  }
};