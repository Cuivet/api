const { Pet } = require('../models/db');

var petService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByTutorId: findByTutorId,
    findByFilter: findByFilter
}

async function save(reqPet){
    var pet = Pet;
    if(reqPet.id){
        await Pet.update(reqPet, { where: { id: reqPet.id }});
        pet = await findOne(reqPet.id);
    } else{
        pet = await Pet.create(reqPet);
        pet = await findOne(pet.id);
    }
    return pet;
}

async function findOne(id){
    const pet = await Pet.findOne({
        where: { id: id }
    });
    return pet;
}

async function findAll(){
    const pets = await Pet.findAll();
    return pets;
}

async function remove(id){
    await Pet.destroy({
        where: { id: id }
    });
    return {message: 'Pet con id ' + id + ' borrado'};
}

async function findByTutorId(tutorId){
    var pets = await Pet.findAll({
        where: { tutorId: tutorId }
    });
    return pets;
}

async function findByFilter(filter){
    var pets = await Pet.findAll(filter);
    pets = pets ? pets : null;
    return pets;
}

module.exports = petService;