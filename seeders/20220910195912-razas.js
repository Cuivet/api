'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let races = [
      // Perro
      {id: 1, name: 'Labrador', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 2, name: 'Golden Retriever', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 3, name: 'Border Collie', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 4, name: 'Jack Russell Terrier', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 5, name: 'Caniche (Poodle)', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 6, name: 'Pastor Alemán', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 7, name: 'Bulldog', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 8, name: 'Beagle', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 9, name: 'Rottweiler', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 10, name: 'Dálmata', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 11, name: 'Shih Tzu', createdAt: new Date(), updatedAt: new Date(), specieId: 1},
      {id: 12, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 1},


      // Gato
      {id: 100, name: 'Abisinio', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 101, name: 'Bombay', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 102, name: 'Balinés', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 103, name: 'Persa', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 104, name: 'Siamés', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 105, name: 'Maine Coon', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 106, name: 'Bengala', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 107, name: 'Siberiano', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 108, name: 'Sphynx', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 109, name: 'British Shorthair', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 110, name: 'Ragdoll', createdAt: new Date(), updatedAt: new Date(), specieId: 2},
      {id: 111, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 2},


      // Ave
      {id: 200, name: 'Canario', createdAt: new Date(), updatedAt: new Date(), specieId: 3},
      {id: 201, name: 'Loro', createdAt: new Date(), updatedAt: new Date(), specieId: 3},
      {id: 202, name: 'Catita', createdAt: new Date(), updatedAt: new Date(), specieId: 3},
      {id: 203, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 3},

      // Conejo
      {id: 300, name: 'Holland Lop', createdAt: new Date(), updatedAt: new Date(), specieId: 4},
      {id: 301, name: 'Netherland Dwarf', createdAt: new Date(), updatedAt: new Date(), specieId: 4},
      {id: 302, name: 'Lionhead', createdAt: new Date(), updatedAt: new Date(), specieId: 4},
      {id: 303, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 4},

      // Hámster
      {id: 400, name: 'Sirio', createdAt: new Date(), updatedAt: new Date(), specieId: 5},
      {id: 401, name: 'Ruso', createdAt: new Date(), updatedAt: new Date(), specieId: 5},
      {id: 402, name: 'Roborowski', createdAt: new Date(), updatedAt: new Date(), specieId: 5},
      {id: 403, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 5},

      // Cobayo
      {id: 500, name: 'Abyssinian', createdAt: new Date(), updatedAt: new Date(), specieId: 6},
      {id: 501, name: 'Peruvian', createdAt: new Date(), updatedAt: new Date(), specieId: 6},
      {id: 502, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 6},

      // Reptil
      {id: 600, name: 'Iguana', createdAt: new Date(), updatedAt: new Date(), specieId: 7},
      {id: 601, name: 'Gecko Leopardo', createdAt: new Date(), updatedAt: new Date(), specieId: 7},
      {id: 602, name: 'Dragón Barbudo', createdAt: new Date(), updatedAt: new Date(), specieId: 7},
      {id: 603, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 7},

      // Pez
      {id: 700, name: 'Goldfish', createdAt: new Date(), updatedAt: new Date(), specieId: 8},
      {id: 701, name: 'Betta', createdAt: new Date(), updatedAt: new Date(), specieId: 8},
      {id: 702, name: 'Guppy', createdAt: new Date(), updatedAt: new Date(), specieId: 8},
      {id: 703, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 8},

      // Hurón
      {id: 800, name: 'Hurón estándar', createdAt: new Date(), updatedAt: new Date(), specieId: 9},
      {id: 801, name: 'Hurón albino', createdAt: new Date(), updatedAt: new Date(), specieId: 9},
      {id: 802, name: 'Hurón sable', createdAt: new Date(), updatedAt: new Date(), specieId: 9},

      // Caballo
      {id: 900, name: 'Pura Sangre', createdAt: new Date(), updatedAt: new Date(), specieId: 10},
      {id: 901, name: 'Árabe', createdAt: new Date(), updatedAt: new Date(), specieId: 10},
      {id: 902, name: 'Cuarto de Milla', createdAt: new Date(), updatedAt: new Date(), specieId: 10},
      {id: 903, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 10},

      // Cerdo
      {id: 1000, name: 'Vietnamita', createdAt: new Date(), updatedAt: new Date(), specieId: 11},
      {id: 1001, name: 'Berkshire', createdAt: new Date(), updatedAt: new Date(), specieId: 11},
      {id: 1002, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 11},

      // Vaca
      {id: 1100, name: 'Holstein', createdAt: new Date(), updatedAt: new Date(), specieId: 12},
      {id: 1101, name: 'Jersey', createdAt: new Date(), updatedAt: new Date(), specieId: 12},
      {id: 1102, name: 'Angus', createdAt: new Date(), updatedAt: new Date(), specieId: 12},
      {id: 1103, name: 'Sin Raza', createdAt: new Date(), updatedAt: new Date(), specieId: 12},
    
    ]
    return queryInterface.bulkInsert('race',races,{} );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('race', null, {});
  }
};