const { ComplementaryStudy } = require('../models/db');

var complementaryStudyService = {
  save: save,
  findOne: findOne,
  updateOne: updateOne, // Nueva función
};

async function save(data) {
  const cs = await ComplementaryStudy.create(data); // Crea el nuevo registro
  return cs; // Devuelve el registro creado
}

// Buscar un Complementary Study por ID
async function findOne(id) {
  const cs = await ComplementaryStudy.findOne({
    where: { id: id }
  });
  return cs;
}

// Actualizar un Complementary Study
async function updateOne(id, data) {
  const [updatedRowsCount, updatedRows] = await ComplementaryStudy.update(data, {
    where: { id: id },
    returning: true, // Devuelve los registros actualizados
  });

  if (updatedRowsCount === 0) {
    return null; // No se encontró el registro
  }

  return updatedRows[0]; // Devuelve el registro actualizado
}

module.exports = complementaryStudyService;
