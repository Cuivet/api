const moment = require('moment/moment');
const { PetAssociation } = require('../models/db');
const veterinaryService = require('./veterinary.service');
const petService = require('./pet.service');
const personService = require('./person.service');
const tutorService = require('./tutor.service');

var petAssociationService = {
    save: save,
    remove: remove,
    findAllByPetId: findAllByPetId,
    findAllByVeterinaryId: findAllByVeterinaryId,
    saveTemporalAssociation: saveTemporalAssociation,
    findTemporalAssociationByCode: findTemporalAssociationByCode
}

var temporalPetAssociations = [];

async function save(reqPetAssociation){
    var petAssociation = PetAssociation;
    petAssociation = await PetAssociation.create(reqPetAssociation);
    petAssociation = await findOne(reqPetAssociation.id);
    return petAssociation;
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

async function findAllByVeterinaryId(veterinaryId){
    var petAssociation = await PetAssociation.findAll({ where: { veterinaryId: veterinaryId } });
    return petAssociation;
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