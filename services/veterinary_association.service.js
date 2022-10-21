const moment = require('moment/moment');
const { VeterinaryAssociation, Veterinary, Vet } = require('../models/db');
const veterinaryService = require('./veterinary.service');
const vetService = require('./vet.service');
const personService = require('./person.service');
const { Op } = require("sequelize");

var veterinaryAssociationService = {
    save: save,
    remove: remove,
    findAllDataByVeterinaryId: findAllDataByVeterinaryId,
    findAllDataByVetId: findAllDataByVetId,
    saveTemporalAssociation: saveTemporalAssociation,
    findTemporalAssociationByCode: findTemporalAssociationByCode,
    findAllDataByRegentId: findAllDataByRegentId
}

var temporalVeterinaryAssociations = [];

async function save(reqVeterinaryAssociations){
    const existentVeterinaryAssociations = await VeterinaryAssociation.findAll({where: {[Op.or]: reqVeterinaryAssociations}});
    existentVeterinaryAssociations.forEach( eva => {
        reqVeterinaryAssociations = reqVeterinaryAssociations.filter(rva => rva.veterinaryId != eva.veterinaryId && eva.vetId != eva.vetId );
    });
    reqVeterinaryAssociations.forEach(async function eachVeteriaryAssociation(veteriaryAssociation){
        await VeterinaryAssociation.create(veteriaryAssociation);
    })
    return await VeterinaryAssociation.findAll({where: {[Op.or]: reqVeterinaryAssociations}});
}

async function remove(id){
    await VeterinaryAssociation.destroy({
        where: { id: id }
    });
    return {message: 'VeterinaryAssociation con id ' + id + ' borrado'};
}

//para las cards de veterinarios normales
//en findAllDataByVetId: traigo toda la data de la veterinaria+los datos del regente
//en esta función pretendo que me traiga esa data para las veterinarias donde tenga asociacion
async function findAllDataByVeterinaryId(veterinaryId){
    let vetsData= [];
    let veterinaryAssociations = await VeterinaryAssociation.findAll({where: {veterinaryId: veterinaryId}});
    veterinaryAssociations.forEach(async function eachVet(veterinaryAssociation) {
        vet = await (vetService.findAllDataByVetId(veterinaryAssociation.vetId));
        vetsData.push({vet: vet});
    });
    return vetsData;
}

async function findAllDataByRegentId(veterinaryId){
    return findAllVeterinaryAssociationData(null, veterinaryId);
}

async function findAllDataByVetId(vetId){
    return findAllVeterinaryAssociationData(vetId, null);
}

//esta de acá abajo no la termine nunca porque me trabé en la de arriba
async function findAllVeterinaryAssociationData(vetId, veterinaryId) {
    let veterinaryAssociations = [];
    let veterinaries = [];

    if(veterinaryId) {
        veterinaryAssociations = await VeterinaryAssociation.findAll({where: {veterinaryId: veterinaryId}});
        const veterinariesIds = veterinaryAssociations.map(veterinaryAssociation => veterinaryAssociation.veterinaryId);
        vets = await vetService.findByFilter({where: {id: veterinariesIds}});
    }

    veterinaryDataList = await veterinaryService.findAllVeterinaryDataByIds(veterinaryAssociations.map(veterinaryAssociation => veterinaryAssociation.veterinaryId));

    var veterinaryAssociationDataList = [];
    veterinaryAssociations.forEach(async function eachVeterinary(veterinaryAssociation) {
        veterinary = veterinaries.find(veterinary => veterinary.id === veterinaryAssociation.veterinaryId);
        veterinaryAssociationDataList.push(
            { 
                veterinaryData: veterinaryDataList.find(veterinaryData => veterinaryData.veterinary.id === veterinaryAssociations.veterinaryId),
                tutorData: tutorDataList.find(tutorData => tutorData.tutor.id === pet.tutorId),
                pet: pet
            });
    });
    return veterinaryAssociationDataList;
}


async function saveTemporalAssociation(reqVeterinaryAssociation){
    const temporalVeterinaryAssociation = {
        mp: reqVeterinaryAssociation.mp,
        vetId: reqVeterinaryAssociation.vetId,
        code: 'V'+Math.floor(100000 + Math.random() * 900000),
        time: moment()
    }
    temporalVeterinaryAssociations.push(temporalVeterinaryAssociation);
    return returnCompleteTemporalAssociation(temporalVeterinaryAssociation);
}

async function findTemporalAssociationByCode(associationCode){
    temporalVeterinaryAssociation = temporalVeterinaryAssociations.find(temporalVeterinaryAssociation => temporalVeterinaryAssociation.code == associationCode);
    if( temporalVeterinaryAssociation === undefined ){
        throw new Exception();
    }
    return returnCompleteTemporalAssociation(temporalVeterinaryAssociation);
}

async function returnCompleteTemporalAssociation(temporalVeterinaryAssociation){
    const veterinary = await veterinaryService.findOneByMP(temporalVeterinaryAssociation.mp);
    const veterinaryPerson = await personService.findByUserId(veterinary.userId);
    const vet = await Vet.findOne({
        where : {id:temporalVeterinaryAssociation.vetId}
    })
    return  {   veterinaryData: { veterinary: veterinary, person: veterinaryPerson },
                vetData: { vet: vet},
                code: temporalVeterinaryAssociation.code
            };
}

module.exports = veterinaryAssociationService;