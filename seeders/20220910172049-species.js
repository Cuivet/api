'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let species = [
      {id:1, name: 'Perro', createdAt: new Date(), updatedAt: new Date()},
      {id:2, name: 'Gato', createdAt: new Date(), updatedAt: new Date()},
      {id:3, name: 'Ave', createdAt: new Date(), updatedAt: new Date()},
      {id: 4, name: 'Conejo', createdAt: new Date(), updatedAt: new Date()},
      {id: 5, name: 'Hámster', createdAt: new Date(), updatedAt: new Date()},
      {id: 6, name: 'Cobayo', createdAt: new Date(), updatedAt: new Date()},
      {id: 7, name: 'Reptil', createdAt: new Date(), updatedAt: new Date()},
      {id: 8, name: 'Pez', createdAt: new Date(), updatedAt: new Date()},
      {id: 9, name: 'Hurón', createdAt: new Date(), updatedAt: new Date()},
      {id: 10, name: 'Caballo', createdAt: new Date(), updatedAt: new Date()},
      {id: 11, name: 'Cerdo', createdAt: new Date(), updatedAt: new Date()},
      {id: 12, name: 'Vaca', createdAt: new Date(), updatedAt: new Date()},
    ]

    return queryInterface.bulkInsert('specie',species,{} );
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('specie', null, {});
  }
};
