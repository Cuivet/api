'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [drugTypes] = await queryInterface.sequelize.query('SELECT id FROM drug_type');
    const drugTypeIds = drugTypes.map(type => type.id);

    let drugs = [
      // Antibióticos
      { id: 100, name: 'Amoxicilina 500mg', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 101, name: 'Cefalexina 250mg', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 102, name: 'Enrofloxacina 50mg', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 103, name: 'Doxiciclina 100mg', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 104, name: 'Gentamicina Inyectable', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 105, name: 'Clindamicina 150mg', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 106, name: 'Metronidazol 500mg', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 107, name: 'Trimetoprima 200mg', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 108, name: 'Eritromicina Suspensión', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },
      { id: 109, name: 'Azitromicina 500mg', drugTypeId: drugTypeIds[0], createdAt: new Date(), updatedAt: new Date() },

      // Vacunas
      { id: 200, name: 'Vacuna Triple Felina', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 201, name: 'Vacuna Quíntuple Canina', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 202, name: 'Vacuna Antirrábica', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 203, name: 'Vacuna Bordetella', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 204, name: 'Vacuna Leptospirosis', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 205, name: 'Vacuna Coronavirus', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 206, name: 'Vacuna Parvovirus', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 207, name: 'Vacuna Moquillo', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 208, name: 'Vacuna Tos de las Perreras', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },
      { id: 209, name: 'Vacuna Hepatitis', drugTypeId: drugTypeIds[1], createdAt: new Date(), updatedAt: new Date() },

      // Desparasitantes
      { id: 300, name: 'Albendazol 200mg', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 301, name: 'Praziquantel 50mg', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 302, name: 'Ivermectina Inyectable', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 303, name: 'Fenbendazol 10%', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 304, name: 'Piperazina Oral', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 305, name: 'Febantel 100mg', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 306, name: 'Levamisol 1%', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 307, name: 'Milbemicina 12mg', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 308, name: 'Selamectina 45mg', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },
      { id: 309, name: 'Nitazoxanida 500mg', drugTypeId: drugTypeIds[2], createdAt: new Date(), updatedAt: new Date() },

      // Analgésicos
      { id: 400, name: 'Metamizol sódico 500mg', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 401, name: 'Buprenorfina Inyectable', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 402, name: 'Butorfanol 2mg', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 403, name: 'Tramadol 50mg', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 404, name: 'Codeína 30mg', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 405, name: 'Fentanilo Parche', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 406, name: 'Meloxicam 15mg', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 407, name: 'Carprofeno 50mg', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 408, name: 'Gabapentina 300mg', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },
      { id: 409, name: 'Hidromorfona 2mg', drugTypeId: drugTypeIds[3], createdAt: new Date(), updatedAt: new Date() },

      // Anti-inflamatorios
      { id: 500, name: 'Prednisolona 10mg', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 501, name: 'Dexametasona 4mg', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 502, name: 'Betametasona Crema', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 503, name: 'Triamcinolona 1mg', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 504, name: 'Hidrocortisona 10mg', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 505, name: 'Ibuprofeno 600mg', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 506, name: 'Flunixin meglumine Inyectable', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 507, name: 'Piroxicam 20mg', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 508, name: 'Ketorolac Sublingual 100mg', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },
      { id: 509, name: 'Aspirina 500mg', drugTypeId: drugTypeIds[4], createdAt: new Date(), updatedAt: new Date() },

      //Antiparasitarios Externos
      { id: 600, name: 'Fipronil Spray 100ml', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 601, name: 'Amitraz Concentrado 500ml', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 602, name: 'Permetrina 5% Spray', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 603, name: 'Selamectina Pipeta', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 604, name: 'Imidacloprid Collar', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 605, name: 'Metaflumizona Pipeta', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 606, name: 'Moxidectina 10ml', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 607, name: 'Fluralaner Comprimido', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 608, name: 'Afoxolaner Pipeta', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() },
      { id: 609, name: 'Lotilaner Tabletas', drugTypeId: drugTypeIds[5], createdAt: new Date(), updatedAt: new Date() }
    ]
    return queryInterface.bulkInsert('drug', drugs, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('drug', null, {});
  }
};