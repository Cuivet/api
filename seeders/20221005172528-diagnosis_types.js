'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let complementaryStudyTypes = [
      {id: 1, name: 'Arritmia', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Infección Urinaria', createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Fractura Expuesta', createdAt: new Date(), updatedAt: new Date()}
    ]
    return queryInterface.bulkInsert('diagnosis_type', complementaryStudyTypes, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('diagnosis_type', null, {});
  }
};