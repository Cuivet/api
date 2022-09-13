const moment = require('moment/moment');
const { PetAssociation, Pet } = require('../models/db');
const veterinaryService = require('./veterinary.service');
const petService = require('./pet.service');
const personService = require('./person.service');
const tutorService = require('./tutor.service');
const { Op } = require("sequelize");

var petAssociationService = {
    save: save,
    remove: remove,
    findAllByPetId: findAllByPetId,
    findAllByTutorId: findAllByTutorId,
    findAllByVeterinaryId: findAllByVeterinaryId,
    saveTemporalAssociation: saveTemporalAssociation,
    findTemporalAssociationByCode: findTemporalAssociationByCode
}

var temporalPetAssociations = [];

async function save(reqPetAssociations){
    const existentPetAssociations = await PetAssociation.findAll({where: {[Op.or]: reqPetAssociations}});
    existentPetAssociations.forEach( epa => {
        reqPetAssociations = reqPetAssociations.filter(rpa => rpa.petId != epa.petId && epa.veterinaryId != epa.veterinaryId );
    });
    reqPetAssociations.forEach(async function eachPetAssociation(petAssociation){
        await PetAssociation.create(petAssociation);
    })
    return await PetAssociation.findAll({where: {[Op.or]: reqPetAssociations}});
}

async function remove(id){
    await PetAssociation.destroy({
        where: { id: id }
    });
    return {message: 'PetAssociation con id ' + id + ' borrado'};
}

async function findAllByPetId(petId){
    var petAssociation = await PetAssociation.findAll({ where: { petId: petId } });
    return petAssociation;
}

async function findAllByTutorId(tutorId){
    const pets = await petService.findByTutorId(tutorId);
    const petIds = pets.map( pet => pet.id);
    const petAssociations = await PetAssociation.findAll({ where: { petId: petIds } });
    const veterinariesIds = petAssociations.map( petAssociation => petAssociation.veterinaryId);
    const veterinaries = await veterinaryService.findByFilter({where: { id: veterinariesIds }});
    const userIds = veterinaries.map( veterinary => veterinary.userId);
    const persons = await personService.findByFilter({where: { userId: userIds }});

    vetXpets = [];
    veterinaries.forEach(async function eachVeterinary(veterinary) {
        veterinaryPetAssociations = petAssociations.filter(petAssociation => petAssociation.veterinaryId === veterinary.id);
        petIdsFromAsoc = veterinaryPetAssociations.map( veterinaryPetAssociation => veterinaryPetAssociation.petId);
        petsFromAsoc = [];
        petIdsFromAsoc.forEach(petId => {
            petsFromAsoc.push(pets.filter(pet => petId === pet.id)[0]);
        });
        const veterinaryPerson = persons.filter( person => person.userId = veterinary.userId)[0];
        vetXpets.push({ veterinaryData: { veterinary: veterinary, person: veterinaryPerson }, pets: petsFromAsoc });
    })
    return vetXpets;
}

async function findAllByVeterinaryId(veterinaryId){
    const petAssociations = await PetAssociation.findAll({ where: { veterinaryId: veterinaryId } });
    const petIds = petAssociations.map( petAssociation => petAssociation.petId);
    const pets = await petService.findByFilter({where: { id: petIds }});
    const tutorIds = pets.map( pet => pet.tutorId);
    const tutors = await tutorService.findByFilter({where: { id: tutorIds }});
    const userIds = tutors.map( tutor => tutor.userId);
    const persons = await personService.findByFilter({where: { userId: userIds }});

    var vetXpets = [];
    pets.forEach(async function eachPet(pet) {
        tutor = tutors.filter(tutor => tutor.id === pet.tutorId)[0];
        tutorPerson = persons.filter(person => person.userId === tutor.userId)[0];
        vetXpets.push({ tutorData: { tutor: tutor, person: tutorPerson }, pet: pet });
    });

    return vetXpets;
}

async function saveTemporalAssociation(reqPetAssociation){
    const temporalPetAssociation = {
        tutorDni: reqPetAssociation.tutorDni,
        veterinaryId: reqPetAssociation.veterinaryId,
        code: Math.floor(100000 + Math.random() * 900000),
        time: moment()
    }
    temporalPetAssociations.push(temporalPetAssociation);
    return returnCompleteTemporalAssociation(temporalPetAssociation);
}

async function findTemporalAssociationByCode(associationCode){
    //despues podemos comprobar que el que este mandando el codigo correponda con pet y vet
    //sino, si mando un associationCode de otra persona puedo generar la asociacion
    temporalPetAssociation = temporalPetAssociations.find(temporalPetAssociation => temporalPetAssociation.code == associationCode);
    if( temporalPetAssociation === undefined ){
        return { error: 'No existe dicha asociacion' }
    }
    return returnCompleteTemporalAssociation(temporalPetAssociation);
}

async function returnCompleteTemporalAssociation(temporalPetAssociation){
    const veterinary = await veterinaryService.findOne(temporalPetAssociation.veterinaryId);
    const veterinaryPerson = await personService.findByUserId(veterinary.userId);
    const tutorPerson = await personService.findOneByDni(temporalPetAssociation.tutorDni);
    const tutor = await tutorService.findByUserId(tutorPerson.userId);
    return  {   veterinaryData: { veterinary: veterinary, person: veterinaryPerson },
                tutorData: { tutor: tutor, person: tutorPerson },
                code: temporalPetAssociation.code
            };
}

module.exports = petAssociationService;