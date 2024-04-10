

const { Qualification } = require('../models/db');


var qualificationService = {
    create: create,
    //save: save,
    findOneById: findOneById,
    findAllByTutorId: findAllByTutorId
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

async function findAllByTutorId(tutorId){
    qualifications = []
    qualificationIds = (await Qualification.findAll({where: {tutorId: tutorId}})).map(qualification => qualification.id);
    for (qualification of qualificationIds) {
        qualifications.push(await findOne(qualificationId));
    }
    return qualifications;
}


module.exports = qualificationService;