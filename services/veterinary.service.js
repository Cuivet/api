const { Veterinary } = require("../models/db");
const personService = require("./person.service");

var veterinaryService = {
  save: save,
  findOne: findOne,
  findAll: findAll,
  remove: remove,
  findByUserId: findByUserId,
  findByFilter: findByFilter,
  findOneByMP: findOneByMP,
  findVeterinaryDataById: findVeterinaryDataById,
  findAllVeterinaryDataByIds: findAllVeterinaryDataByIds,
  findVeterinaryDataByMP: findVeterinaryDataByMP,
};

async function save(reqVeterinary) {
  var veterinary = Veterinary;
  if (reqVeterinary.id) {
    await Veterinary.update(reqVeterinary, { where: { id: reqVeterinary.id } });
    veterinary = await findOne(reqVeterinary.id);
  } else {
    veterinary = await Veterinary.create(reqVeterinary);
    veterinary = await findOne(veterinary.id);
  }
  return veterinary;
}

async function findOne(id) {
  const veterinary = await Veterinary.findOne({
    where: { id: id },
  });
  return veterinary;
}

async function findOneByMP(mp) {
  const veterinary = await Veterinary.findOne({
    where: { mp: mp },
  });
  return veterinary;
}

async function findAll() {
  const veterinaries = await Veterinary.findAll();
  return veterinaries;
}

async function remove(id) {
  await Veterinary.destroy({
    where: { id: id },
  });
  return { message: "Veterinary con id " + id + " borrado" };
}

async function findByUserId(userId) {
  var veterinary = await Veterinary.findOne({
    where: { userId: userId },
  });
  veterinary = veterinary ? veterinary : null;
  return veterinary;
}

async function findByFilter(filter) {
  var veterinaries = await Veterinary.findAll(filter);
  veterinaries = veterinaries ? veterinaries : null;
  return veterinaries;
}

async function findVeterinaryDataById(id) {
  const veterinary = await findOne(id);
  const person = await personService.findByUserId(veterinary.userId);
  return { tutor: veterinary, person: person };
}

async function findVeterinaryDataByMP(mp) {
  const vetService = require("./vet.service");
  const veterinary = await veterinaryService.findOneByMP(mp);
  const veterinaryData = await veterinaryService.findAllVeterinaryDataByIds(
    veterinary.id
  );
  const veterinariasRegente = await vetService.findAllByRegentId(veterinary.id);
  if (veterinariasRegente.length > 0) {
    veterinaryData[0].isAlreadyRegent = true;
  }
  return veterinaryData[0];
}

async function findAllVeterinaryDataByIds(veterinaryIds) {
  veterinaryDataList = [];
  const veterinaries = await veterinaryService.findByFilter({
    where: { id: veterinaryIds },
  });
  const veterinaryUserIds = veterinaries.map((veterinary) => veterinary.userId);
  const veterinaryPersons = await personService.findByFilter({
    where: { userId: veterinaryUserIds },
  });
  veterinaries.forEach((veterinary) => {
    veterinaryDataList.push({
      veterinary: veterinary,
      person: veterinaryPersons.find(
        (person) => person.userId === veterinary.userId
      ),
    });
  });
  return veterinaryDataList;
}

module.exports = veterinaryService;
