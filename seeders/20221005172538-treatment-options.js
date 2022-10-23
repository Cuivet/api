'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let treatmentOptions = [
      {id: 1, name: 'Antiinflamatorio', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: 'Hipnótico/Sedante', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: 'Antipirético/Antifebril', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 4, name: 'Analgésico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 5, name: 'Anestésico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 6, name: 'Antibiótico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 7, name: 'Anticolinérgico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 8, name: 'Anticonceptivo', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 9, name: 'Anticonvulsivo', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 10, name: 'Antidiabético', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 11, name: 'Antiemético', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 12, name: 'Antihelmíntico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 13, name: 'Antihipertensivo', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 14, name: 'Antihistamínico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 15, name: 'Antineoplásico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 16, name: 'Antimicótico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 17, name: 'Antídoto', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 18, name: 'Cardiotónico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 19, name: 'Broncodilatador', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 20, name: 'Quimioterápico', treatmentTypeId: 1, createdAt: new Date(), updatedAt: new Date()},

      {id: 100, name: 'Castración', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 101, name: 'Cirugía de obstrucción intestinal', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 102, name: 'Cirugía de hernia', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 103, name: 'Cirugía de cataratas', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 104, name: 'Cirugía traumatologica', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 105, name: 'Caudotomía', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 106, name: 'Destartraje', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 107, name: 'Esplenectomía', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 108, name: 'Otohematomas', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 109, name: 'Adenomas Perianales', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 110, name: 'Cistotomia', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 111, name: 'Cesárea', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 112, name: 'Extripación de ovarios', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 113, name: 'Extracción de tumor', treatmentTypeId: 2, createdAt: new Date(), updatedAt: new Date()},

      {id: 200, name: 'Hepatitis infecciosa', treatmentTypeId: 3, createdAt: new Date(), updatedAt: new Date()},
      {id: 201, name: 'Parvovirus/Moquillo', treatmentTypeId: 3, createdAt: new Date(), updatedAt: new Date()},
      {id: 202, name: 'Tos de las perreras', treatmentTypeId: 3, createdAt: new Date(), updatedAt: new Date()},
      {id: 203, name: 'Polivalente', treatmentTypeId: 3, createdAt: new Date(), updatedAt: new Date()},
      {id: 204, name: 'Antirrábica', treatmentTypeId: 3, createdAt: new Date(), updatedAt: new Date()},
      {id: 205, name: 'Polivalente rábica', treatmentTypeId: 3, createdAt: new Date(), updatedAt: new Date()}
    ]
    return queryInterface.bulkInsert('treatment_option', treatmentOptions, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('treatment_option', null, {});
  }
};