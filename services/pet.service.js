const { Pet, Race, Specie } = require("../models/db");

var petService = {
  save: save,
  findOne: findOne,
  findAll: findAll,
  remove: remove,
  findByTutorId: findByTutorId,
  findByFilter: findByFilter,
  findDataByTutorId: findDataByTutorId,
};

async function save(reqPet) {
  var pet = Pet;
  if (reqPet.id) {
    await Pet.update(reqPet, { where: { id: reqPet.id } });
    pet = await findOne(reqPet.id);
  } else {
    pet = await Pet.create(reqPet);
    pet = await findOne(pet.id);
  }
  return pet;
}

async function findOne(id) {
  const pet = await Pet.findOne({
    where: { id: id },
  });
  return pet;
}

async function findAll() {
  const pets = await Pet.findAll();
  return pets;
}

async function remove(id) {
  await Pet.destroy({
    where: { id: id },
  });
  return { message: "Pet con id " + id + " borrado" };
}

async function findByTutorId(tutorId) {
  var pets = await Pet.findAll({
    where: { tutorId: tutorId },
  });
  return pets;
}

async function findByFilter(filter) {
  var pets = await Pet.findAll(filter);
  pets = pets ? pets : null;
  return pets;
}

async function findDataByTutorId(tutorId) {
  try {
    const pets = await Pet.findAll({
      where: { tutorId },
      include: [
        {
          model: Race,
          attributes: ["name"],
          include: [
            {
              model: Specie,
              attributes: ["name"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });
    // Mapeamos los resultados para devolver los datos procesados
    return pets.map((pet) => ({
      id: pet.id,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      tutorId: pet.tutorId,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      raceName: pet.race?.name || "Desconocido",
      raceId: pet.raceId,
      specieId: pet.race?.specie?.id,
      specieName: pet.race?.specie?.name || "Desconocido",
    }));
  } catch (error) {
    console.error("Error fetching pets data:", error);
    throw error;
  }
}

module.exports = petService;
