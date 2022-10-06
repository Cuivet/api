'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let complementaryStudyTypes = [
      {id: 1, name: 'Ecografía', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Rayos', createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Tomografía', createdAt: new Date(), updatedAt: new Date()}
    ]
    return queryInterface.bulkInsert('complementary_study_type', complementaryStudyTypes, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('complementary_study_type', null, {});
  }
};