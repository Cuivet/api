'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let anamnesisQuestions = [
      { id: 1, question: '¿Presenta lesiones expuestas? Describa cuales', isBooleanResponse: true, isTextResponse: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, question: '¿El pulso es correcto?', isBooleanResponse: true, isTextResponse: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, question: '¿Cómo ve el estado de la mascota en general?', isBooleanResponse: false, isTextResponse: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, question: '¿Ha tenido episodios de vómito o diarrea?', isBooleanResponse: true, isTextResponse: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, question: '¿Ha notado cambios en el apetito?', isBooleanResponse: true, isTextResponse: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, question: '¿Presenta dificultades para respirar?', isBooleanResponse: true, isTextResponse: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, question: '¿Ha observado comportamientos inusuales o letargo?', isBooleanResponse: true, isTextResponse: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, question: '¿Hay signos de dolor al movimiento?', isBooleanResponse: true, isTextResponse: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, question: '¿Se han presentado cambios en el pelaje o piel?', isBooleanResponse: true, isTextResponse: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, question: '¿Está al día con las vacunaciones?', isBooleanResponse: true, isTextResponse: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, question: '¿El animal tiene antecedentes de enfermedades crónicas?', isBooleanResponse: true, isTextResponse: true, createdAt: new Date(), updatedAt: new Date() }
    ]
    return queryInterface.bulkInsert('anamnesis_question', anamnesisQuestions, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('anamnesis_question', null, {});
  }
};