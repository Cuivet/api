const {
  Vaccination,
  Drug,
  DrugType,
  Vet,
  Veterinary,
} = require("../models/db");
const { findByFilter } = require("./pet.service");
const personService = require("./person.service");

var vaccinationService = {
  create: create,
  save: save,
  findOne: findOne,
  findAll: findAll,
  remove: remove,
  findAllByPetId: findAllByPetId,
  findAllByVeterinaryId: findAllByVeterinaryId,
  findAllByPetId1: findAllByPetId1,
};

async function create(reqVac) {
  id = (
    await Vaccination.create({
      placementDate: reqVac.placementDate,
      nextDate: reqVac.nextDate,
      weight: reqVac.weight,
      observation: reqVac.observation,
      drugId: reqVac.drugId,
      signed: reqVac.signed,
      petId: reqVac.petId,
      vetId: reqVac.vetId,
      veterinaryId: reqVac.veterinaryId,
    })
  ).id;
  return findOne(id);
}
async function save(reqVac) {
  var vac = Vaccination;
  if (reqVac.id) {
    await Vaccination.update(reqVac, { where: { id: reqVac.id } });
    vac = await findOne(reqVac.id);
  } else {
    vac = await Vaccination.create(reqVac);
    vac = await findOne(vac.id);
  }
  return vac;
}

async function findOne(id) {
  const vac = await Vaccination.findOne({ where: { id: id } });
  return vac;
}

async function findAll() {
  const vacs = await Vaccination.findAll();
  return vacs;
}

async function remove(id) {
  await Vaccination.destroy({ where: { id: id } });
  return { message: "Vaccination con id " + id + " borrado" };
}

async function findAllByVeterinaryId(id) {
  vaccinations = [];
  vaccinationIds = (
    await Vaccination.findAll({ where: { veterinaryId: id } })
  ).map((vac) => vac.id);
  for (vaccinationId of vaccinationIds) {
    vaccinations.push(await findOne(vaccinationId));
  }
  return vaccinations;
}

async function findAllByPetId(petId) {
  try {
    const vaccinations = await Vaccination.findAll({
      where: { petId },
      include: [
        {
          model: Drug,
          attributes: ["name"],
          include: [
            {
              model: DrugType,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Vet,
          attributes: ["name"],
        },
        { model: Veterinary },
      ],
      attributes: [
        "id",
        "placementDate",
        "nextDate",
        "weight",
        "observation",
        "signed",
        "petId",
        "vetId",
        "createdAt",
        "updatedAt",
      ],
      raw: true,
      nest: true,
    });

    const result = await Promise.all(
      vaccinations.map(async (vaccination) => {
        const userId = vaccination.veterinary?.userId;
        const veterinary = userId
          ? await personService.findByUserId(userId)
          : null;
        return {
          id: vaccination.id,
          placementDate: vaccination.placementDate,
          nextDate: vaccination.nextDate,
          weight: vaccination.weight,
          observation: vaccination.observation,
          signed: vaccination.signed,
          drugName: vaccination.drug?.name || "Desconocido",
          drugTypeName: vaccination.drug?.drug_type?.name || "Desconocido",
          vetId: vaccination.vetId,
          vetName: vaccination.vet.name,
          petId: vaccination.petId,
          createdAt: vaccination.createdAt,
          updatedAt: vaccination.updatedAt,
          veterinaryData: veterinary ? veterinary : "Desconocido",
        };
      })
    );
    return result;
  } catch (error) {
    console.error("Error fetching vaccinations:", error);
    throw error;
  }
}

async function findAllByPetId1(id) {
  vaccinations = [];
  vaccinationIds = (await Vaccination.findAll({ where: { petId: id } })).map(
    (vac) => vac.id
  );
  for (vaccinationId of vaccinationIds) {
    vaccinations.push(await findOne(vaccinationId));
  }
  return vaccinations;
}

module.exports = vaccinationService;
