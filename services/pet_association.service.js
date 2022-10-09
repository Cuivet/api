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
    findAllDataByTutorId: findAllDataByTutorId,
    findAllDataByVeterinaryId: findAllDataByVeterinaryId,
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

async function findAllDataByTutorId(tutorId){
    return findAllPetAssociationData(null, tutorId);
}

async function findAllDataByVeterinaryId(veterinaryId){
    return findAllPetAssociationData(veterinaryId, null);
}

async function findAllPetAssociationData(veterinaryId, tutorId) {
    let petAssociations = [];
    let pets = [];

    if(veterinaryId) {
        petAssociations = await PetAssociation.findAll({where: {veterinaryId: veterinaryId}});
        const petIds = petAssociations.map(petAssociation => petAssociation.petId);
        pets = await petService.findByFilter({where: {id: petIds}});
    }
    if(tutorId) {
        pets = await petService.findByTutorId(tutorId);
        const petByTutorIds = pets.map( pet => pet.id);
        petAssociations = await PetAssociation.findAll({where: { petId: petByTutorIds }});
    }

    tutorDataList = await tutorService.findAllTutorDataByIds(pets.map(pet => pet.tutorId));
    veterinaryDataList = await veterinaryService.findAllVeterinaryDataByIds(petAssociations.map(petAssociation => petAssociation.veterinaryId));

    var petAssociationDataList = [];
    petAssociations.forEach(async function eachPet(petAssociation) {
        pet = pets.find(pet => pet.id === petAssociation.petId);
        petAssociationDataList.push(
            { 
                veterinaryData: veterinaryDataList.find(veterinaryData => veterinaryData.veterinary.id === petAssociation.veterinaryId),
                tutorData: tutorDataList.find(tutorData => tutorData.tutor.id === pet.tutorId),
                pet: pet
            });
    });
    return petAssociationDataList;
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
        throw new Exception();
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