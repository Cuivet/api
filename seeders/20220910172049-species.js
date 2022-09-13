'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let species = [
      {name: 'Perro', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Gato', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Ave', createdAt: new Date(), updatedAt: new Date()},
    ]

    return queryInterface.bulkInsert('specie',species,{} );
  },
  // down: (queryInterface, Sequelize) => {
  //   return queryInterface.bulkDelete('Race', null, {});
  // }
};
