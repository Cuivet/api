const {
  ComplementaryStudy,
  PresumptiveDiagnosis,
  Visit,
  ClinicalRecord,
  Pet,
  Veterinary,
  User,
  Person,
  Tutor,
  ComplementaryStudyType,
  Vet,
} = require("../models/db");
const personService = require("./person.service");
const petService = require("./pet.service");

var complementaryStudyService = {
  save: save,
  findOne: findOne,
  updateOne: updateOne,
  findAllStudiesByVetId: findAllStudiesByVetId,
  findAllStudiesByPetIds: findAllStudiesByPetIds,
};

async function save(data) {
  const cs = await ComplementaryStudy.create(data); // Crea el nuevo registro
  return cs; // Devuelve el registro creado
}

// Buscar un Complementary Study por ID
async function findOne(id) {
  const cs = await ComplementaryStudy.findOne({
    where: { id: id },
  });
  return cs;
}

// Actualizar un Complementary Study
async function updateOne(id, data) {
  const [updatedRowsCount, updatedRows] = await ComplementaryStudy.update(
    data,
    {
      where: { id: id },
      returning: true, // Devuelve los registros actualizados
    }
  );

  if (updatedRowsCount === 0) {
    return null; // No se encontró el registro
  }

  return updatedRows[0]; // Devuelve el registro actualizado
}

async function findAllStudiesByVetId(vetId) {
  try {
    const studies = await ComplementaryStudy.findAll({
      include: [
        {
          model: PresumptiveDiagnosis,
          include: [
            {
              model: Visit,
              include: [
                {
                  model: ClinicalRecord,
                  where: { vetId: vetId },
                  include: [
                    {
                      model: Pet,
                      attributes: ["name"],
                      include: [
                        {
                          model: Tutor,
                          attributes: ["userId"],
                        },
                      ],
                    },
                    { model: Veterinary },
                  ],
                },
              ],
            },
          ],
        },
        { model: ComplementaryStudyType, attributes: ["name"] },
      ],
      attributes: ["id", "url", "observation", "createdAt"],
      raw: true,
      nest: true,
    });

    const result = await Promise.all(
      studies.map(async (study) => {
        const userId =
          study.presumptive_diagnosis.visit.clinical_record.veterinary.userId;
        const tutorUserId =
          study.presumptive_diagnosis.visit.clinical_record.pet.tutor.userId;
        const veterinary = await personService.findByUserId(userId);
        const tutor = await personService.findByUserId(tutorUserId);
        if (
          !study.presumptive_diagnosis.visit.clinical_record.pet.name ||
          !veterinary ||
          !tutor
        ) {
          return null;
        }
        return {
          id: study.id,
          URL: study.url ? study.url : "",
          studyTypeName: study.complementary_study_type.name,
          createdAt: study.createdAt,
          petName: study.presumptive_diagnosis.visit.clinical_record.pet.name,
          veterinaryData: veterinary ? veterinary : "Desconocido",
          tutorData: tutor ? tutor : "Desconocido",
        };
      })
    );

    // return result;
    return result.filter((study) => study !== null);
  } catch (error) {
    console.error("Error fetching studies:", error);
    throw error;
  }
}

async function findAllStudiesByPetIds(tutorId) {
  const pets = await petService.findByTutorId(tutorId);
  const petIds = pets.map((pet) => pet.id);
  const studies = await ComplementaryStudy.findAll({
    include: [
      {
        model: PresumptiveDiagnosis,
        include: [
          {
            model: Visit,
            include: [
              {
                model: ClinicalRecord,
                where: { petId: petIds },
                include: [
                  {
                    model: Pet,
                    attributes: ["name"],
                  },
                  { model: Veterinary },
                  { model: Vet, attributes: ["name", "address", "phone"] },
                ],
              },
            ],
          },
        ],
      },
      { model: ComplementaryStudyType, attributes: ["name"] },
    ],
    attributes: ["createdAt", "url"],
    raw: true,
    nest: true,
  });
  const result = await Promise.all(
    studies.map(async (study) => {
      const userId =
        study.presumptive_diagnosis.visit.clinical_record.veterinary.userId;
      const veterinary = await personService.findByUserId(userId);
      if (
        !study.presumptive_diagnosis.visit.clinical_record.pet.name ||
        !veterinary
      ) {
        return null;
      }
      return {
        URL: study.url ? study.url : "",
        studyTypeName: study.complementary_study_type.name,
        createdAt: study.createdAt,
        petName: study.presumptive_diagnosis.visit.clinical_record.pet.name,
        veterinaryData: veterinary ? veterinary : "Desconocido",
        vetData:
          study.presumptive_diagnosis.visit.clinical_record.vet ??
          "Desconocido",
      };
    })
  );
  return result.filter((study) => study !== null);
}

module.exports = complementaryStudyService;
