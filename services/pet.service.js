const { Pet } = require('../models/db');
var crypto = require('crypto');


var petService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByTutorId: findByTutorId
}

async function save(reqPet){
    var pet = Pet;
    reqPet.imageCode = crypto.randomBytes(20).toString('hex');
    if(reqPet.id){
        pet = await Pet.update(reqPet, { where: { id: reqPet.id }});
    } else{
        pet = await Pet.create(reqPet);
    }
    pet = await findOne(pet.id);
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