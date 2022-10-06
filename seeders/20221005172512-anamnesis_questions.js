'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let anamnesisQuestions = [
      {id: 1, question: '¿Presenta lesiones expuestas? Describa cuales', isBooleanResponse: true, isTextResponse: true, createdAt: new Date(), updatedAt: new Date()},
      {id: 2, question: '¿El pulso es correcto?', isBooleanResponse: true, isTextResponse: false, createdAt: new Date(), updatedAt: new Date()},
      {id: 3, question: '¿Cómo ve el estado de la mascota en general?', isBooleanResponse: false, isTextResponse: true, createdAt: new Date(), updatedAt: new Date()}
    ]
    return queryInterface.bulkInsert('anamnesis_question', anamnesisQuestions, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('anamnesis_question', null, {});
  }
};