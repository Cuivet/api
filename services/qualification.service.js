const { Qualification } = require("../models/db");
const petService = require("./pet.service");
const Sequelize = require("sequelize");

var qualificationService = {
  save: save,
  findOneById: findOneById,
  findOne: findOne,
  findAllByTutorId: findAllByTutorId,
  findAllByClinicalRecordIds: findAllByClinicalRecordIds,
  create: create
};

async function create(reqVac) {
  id = (
    await Qualification.create({
      clinicalRecordId: reqVac.clinicalRecordId,
    })
  ).id;
  return findOne(id);
}

async function save(qualification) {
  if (qualification.key) {
    // Crear un objeto con los datos actualizados
    const updatedQualification = {
      qualification: qualification.qualification,
      observation_qa: qualification.observation,
    };

    try {
      await Qualification.update(updatedQualification, {
        where: { id: qualification.key },
      });

      console.log(
        `Calificación con ID ${qualification.key} actualizada correctamente.`
      );
    } catch (error) {
      console.error("Error al actualizar la calificación:", error);
    }
  } else {
    console.error("No se puede actualizar una calificación sin ID.");
  }
}

async function findOneById(id) {
  const qualification = await Qualification.findAll({
    where: { id: id },
  });
  return qualification;
}
async function findOne(id) {
  const qualification = await Qualification.findOne({
    where: { id: id },
  });
  return qualification;
}

async function findAllByClinicalRecordIds(clinicalRecordIds) {
  const qualifications = await Qualification.findAll({
    where: {
      clinicalRecordId: {
        [Sequelize.Op.in]: clinicalRecordIds,
      },
    },
  });
  return qualifications;
}

async function findAllByTutorId(tutorId) {
  const clinicalRecordService = require("./clinical_record.service");

  const petIds = (await petService.findByTutorId(tutorId)).map((pet) => pet.id);

  clinicalRecordResponse = [];
  for (let petId of petIds) {
    const recordsForPet = await clinicalRecordService.findAllByPet(petId);

    if (clinicalRecordResponse.lenght > 0) {
      clinicalRecordResponse.push(...recordsForPet); // Añadir los elementos del array uno por uno
    }
    // Si es un solo objeto, lo añadimos directamente.
    else if (recordsForPet) {
      clinicalRecordResponse.push(recordsForPet); // Añadir el objeto al array
    }
  }

  //const clinicalRecords = await clinicalRecordService.findAllCRByPetIds(petIds);
  const qualificationbyTutor = await findAllByClinicalRecordIds(
    clinicalRecords.map((cr) => cr.id)
  );
  resultadoQualifications = [];
  clinicalRecords.map((clinicalRecord) => {
    qualification = qualificationbyTutor.find(
      (q) => q.clinicalRecordId === clinicalRecord.id
    ); // Encuentra la calificación correspondiente
    objeto = {
      qualification: qualification,
      clinicalRecord: clinicalRecord,
    };

    resultadoQualifications.push(objeto);
  });
  // Devuelve el resultado
  return resultadoQualifications;
}

module.exports = qualificationService;
