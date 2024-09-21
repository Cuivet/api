

const { Qualification } = require('../models/db');
const clinicalRecordService = require('./clinical_record.service');
const petService = require('./pet.service');


var qualificationService = {
    create: create,
    //save: save,
    findOneById: findOneById,
    findOne: findOne,
    findAllByTutorId:findAllByTutorId,
    findAllByClinicalRecordIds:findAllByClinicalRecordIds//,
   // findAllByTutorId: findAllByTutorId
}

async function create(qualification) {
    const id = (await Qualification.create({clinicalRecordId: qualification.clinicalRecordId})).id;
    return findOne(id);
}

async function findOneById(id){
    const qualification = await Qualification.findAll({
        where: { id: id }
    });
    return qualification;
}
async function findOne(id){
    const qualification = await Qualification.findOne({
        where: { id: id }
    });
    return qualification;
}

async function findAllByClinicalRecordIds(clinicalRecordIds) {
    const qualifications = await Qualification.findAll({
        where: {
            clinicalRecordId: {
                [Sequelize.Op.in]: clinicalRecordIds
            }
        }
    });
    return qualifications;
}
async function findAllByTutorId(tutorId){//tengo una lista de pets, entonces genero una lista de clinical_record que coincidan con esa mascota
    const petIds = (await petService.findByTutorId(tutorId)).map(pet => pet.id);

    const clinicalRecordIds = (await clinicalRecordService.findAllByPetIds(petIds)).map(cr => cr.id);
    
    return findAllByClinicalRecordIds(clinicalRecordIds);
    
}


module.exports = qualificationService;