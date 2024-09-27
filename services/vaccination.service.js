const { Vaccination } = require("../models/db");
const { findByFilter } = require("./pet.service");

var vaccinationService = {
  create: create,
  save: save,
  findOne: findOne,
  findAll: findAll,
  remove: remove,
  findAllByPetId: findAllByPetId,
  findAllByVeterinaryId: findAllByVeterinaryId
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

async function findAllByPetId(id) {
  vaccinations = [];
  vaccinationIds = (await Vaccination.findAll({ where: { petId: id } })).map(
    (vac) => vac.id
  );
  for (vaccinationId of vaccinationIds) {
    vaccinations.push(await findOne(vaccinationId));
  }
  return vaccinations;
}

async function findAllByVeterinaryId(id) {
  vaccinations = [];
  vaccinationIds = (
    await Vaccination.findAll({ where: { veterinaryId: id } })).map(
      (vac) => vac.id
    );
  for (vaccinationId of vaccinationIds) {
    vaccinations.push(await findOne(vaccinationId));
  }
  return vaccinations;
}
    
module.exports = vaccinationService;
