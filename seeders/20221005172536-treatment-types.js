'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let treatmentTypes = [
      {id: 1, name: 'Fisioterapéutico', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Fármaco desinflamatorio', createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Fármaco desinfectante', createdAt: new Date(), updatedAt: new Date()}
    ]
    return queryInterface.bulkInsert('treatment_type', treatmentTypes, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('treatment_type', null, {});
  }
};