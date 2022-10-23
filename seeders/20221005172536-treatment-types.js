'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let treatmentTypes = [
      {id: 1, name: 'Médico', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Quirúrgico', createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Preventivo', createdAt: new Date(), updatedAt: new Date()}
    ]
    return queryInterface.bulkInsert('treatment_type', treatmentTypes, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('treatment_type', null, {});
  }
};