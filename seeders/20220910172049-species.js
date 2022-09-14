'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let species = [
      {id:"1", name: 'Perro', createdAt: new Date(), updatedAt: new Date()},
      {id:"2", name: 'Gato', createdAt: new Date(), updatedAt: new Date()},
      {id:"3", name: 'Ave', createdAt: new Date(), updatedAt: new Date()},
    ]

    return queryInterface.bulkInsert('specie',species,{} );
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('specie', null, {});
  }
};
