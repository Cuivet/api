'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let races = [
      {id:"1", name: 'Labrador', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {id:"2", name: 'Golden', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {id:"3", name: 'Colly', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {id:"4", name: 'Jack Russell', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {id:"5", name: 'Caniche', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {id:"6", name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: "1"},
      {id:"7", name: 'Abisinio', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {id:"8", name: 'Bombay', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {id:"9", name: 'Balinés', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {id:"10", name: 'Persa', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {id:"11", name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: "2"},
      {id:"12", name: 'Canario', createdAt: new Date(), updatedAt: new Date(), specieId: "3"},
      {id:"13", name: 'Loro', createdAt: new Date(), updatedAt: new Date(), specieId: "3"},
      {id:"14", name: 'Catita', createdAt: new Date(), updatedAt: new Date(), specieId: "3"},
      {id:"15", name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: "3"},
    ]
    return queryInterface.bulkInsert('race',races,{} );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('race', null, {});
  }
};