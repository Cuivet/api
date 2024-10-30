const moment = require('moment/moment');
const { VeterinaryAssociation, Veterinary, Vet } = require('../models/db');
const veterinaryService = require('./veterinary.service');
const vetService = require('./vet.service');
const personService = require('./person.service');
const { Op } = require("sequelize");

var veterinaryAssociationService = {
    save: save,
    remove: remove,
    saveTemporalAssociation: saveTemporalAssociation,
    findTemporalAssociationByCode: findTemporalAssociationByCode,
    findAllDataByRegentOrVeterinary: findAllDataByRegentOrVeterinary,
    findAllDataByVeterinaryId: findAllDataByVeterinaryId,
    findAllVeterinariesByRegentId: findAllVeterinariesByRegentId,
    findByFilter: findByFilter
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

async function saveTemporalAssociation(reqVeterinaryAssociation){
    const temporalVeterinaryAssociation = {
        mp: reqVeterinaryAssociation.mp,
        vetId: reqVeterinaryAssociation.vetId,
        code: 'V'+Math.floor(100000 + Math.random() * 900000),
        expiresAt: moment().add(10, "minutes")
    }
    temporalVeterinaryAssociations.push(temporalVeterinaryAssociation);
    return returnCompleteTemporalAssociation(temporalVeterinaryAssociation);
}

async function findTemporalAssociationByCode(associationCode){
    temporalVeterinaryAssociation = temporalVeterinaryAssociations.find(temporalVeterinaryAssociation => temporalVeterinaryAssociation.code == associationCode);
    if( temporalVeterinaryAssociation === undefined ){
        throw new Exception();
    }
    if (moment().isAfter(temporalVeterinaryAssociation.expiresAt)) {
		throw new Error('Code has expired');
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

async function findAllDataByRegentOrVeterinary(veterinaryId) {
    vetAsDataList = [];

    vetAsDataListByRegent = await findAllDataByRegentId(veterinaryId);
    vetAsDataList.push.apply(vetAsDataList, vetAsDataListByRegent);

    vetAsDataListByVeterinary = await findAllDataByVeterinaryId(veterinaryId);
    vetAsDataList.push.apply(vetAsDataList, vetAsDataListByVeterinary);
    
    return vetAsDataList;
}

async function findAllDataByRegentId(regentId) {
    vetAsDataListByRegent = [];
    var vets = await vetService.findAllByRegentId(regentId);
    var vetDataList = await vetService.findAllVetDataByIds(vets.map( vet => vet.id ));
    vets.forEach( vet => {
        vetAsDataListByRegent.push(
            {
                vetData: vetDataList.find( vdl => vdl.vet.id === vet.id),
                veterinaryData: vetDataList.find( vdl => vdl.vet.id === vet.id).regentData
            }
        )
    })
    return vetAsDataListByRegent;
}

async function findAllDataByVeterinaryId(veterinaryId) {
    vetAsDataListByVeterinary = [];
    var vetAssociationList = await VeterinaryAssociation.findAll({ where: { veterinaryId: veterinaryId }});
    var vetDataList = await vetService.findAllVetDataByIds(vetAssociationList.map( val => val.vetId ));
    var veterinaryDataList = await veterinaryService.findAllVeterinaryDataByIds(vetAssociationList.map( val => val.veterinaryId ));
    vetAssociationList.forEach( val => {
        vetAsDataListByVeterinary.push(
            {
                vetData: vetDataList.find( vdl => vdl.vet.id === val.vetId),
                veterinaryData: veterinaryDataList.find( vydl => vydl.veterinary.id === val.veterinaryId)
            }
        )
    })
    return vetAsDataListByVeterinary;
}

async function findAllVeterinariesByRegentId(regentId) {
    veterinaryDataListByRegent = [];
    vetAsDataListByRegent = await findAllDataByRegentId(regentId); //traigo toda la data para las que soy regente (vetData+veterinaryData[regente])
    const vetIds = vetAsDataListByRegent.map(vet => vet.vetData.vet.id);//saco los ids de esas vets donde soy regete
    var vetAssociationList = await VeterinaryAssociation.findAll({ where: { vetId: vetIds }});//busco todas las asociaciones que tienen las vets donde soy reg
    var veterinaryDataList = await veterinaryService.findAllVeterinaryDataByIds(vetAssociationList.map( val => val.veterinaryId ));//toda la data de los co veterinarios
    vetAssociationList.forEach( val => {
        veterinaryDataListByRegent.push(
            {   
                vetData: vetDataList.find( vdl => vdl.vet.id === val.vetId),
                coveterinaryData: veterinaryDataList.find( vydl => vydl.veterinary.id === val.veterinaryId)
            }
        )
    })
    return veterinaryDataListByRegent;
}

async function findByFilter(filter){
    var vetAssociationList = await VeterinaryAssociation.findAll(filter);
    vetAssociationList = vetAssociationList ? vetAssociationList : null;
    return vetAssociationList;
}

module.exports = veterinaryAssociationService;