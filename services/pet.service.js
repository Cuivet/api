const { Pet } = require('../models/db');

var petService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByTutorId: findByTutorId
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
    const pet = await Pet.findAll({
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
    var pet = await Pet.findAll({
        where: { tutorId: tutorId }
    });
    //pet = pet.length ? pet[0] : null;
    return pet;
}

module.exports = petService;