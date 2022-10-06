const { Tutor } = require('../models/db');
const personService = require('./person.service');

var tutorService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByUserId: findByUserId,
    findByFilter: findByFilter,
    findTutorDataById: findTutorDataById,
    findAllTutorDataByIds: findAllTutorDataByIds,
    findTutorDataByDni: findTutorDataByDni
}

async function save(reqTutor){
    var tutor = Tutor;
    if(reqTutor.id){
        await Tutor.update(reqTutor, { where: { id: reqTutor.id }});
        tutor = await findOne(reqTutor.id);
    } else{
        tutor = await Tutor.create(reqTutor);
        tutor = await findOne(tutor.id);
    }
    return tutor;
}

async function findOne(id){
    const tutor = await Tutor.findOne({
        where: { id: id }
    });
    return tutor;
}

async function findAll(){
    const tutors = await Tutor.findAll();
    return tutors;
}

async function remove(id){
    await Tutor.destroy({
        where: { id: id }
    });
    return {message: 'Tutor con id ' + id + ' borrado'};
}

async function findByUserId(userId){
    var tutor = await Tutor.findOne({
        where: { userId: userId }
    });
    tutor = tutor ? tutor : null;
    return tutor;
}

async function findByFilter(filter){
    var tutors = await Tutor.findAll(filter);
    tutors = tutors ? tutors : null;
    return tutors;
}

async function findTutorDataById(id){
    const tutor = await findOne(id);
    const person = await personService.findByUserId(tutor.userId);
    return {tutor: tutor, person: person};
}

async function findTutorDataByDni(dni){
    const tutorPerson = await personService.findByFilter({where: { dni: dni }});
    const tutor = await tutorService.findByFilter({where: { userId: tutorPerson[0].userId }});
    return {tutor: tutor[0], person: tutorPerson[0]};
}

async function findAllTutorDataByIds(tutorIds){
    tutorDataList = [];
    const tutors = await tutorService.findByFilter({where: { id: tutorIds }});
    const tutorUserIds = tutors.map( tutor => tutor.userId );
    const tutorPersons = await personService.findByFilter({where: { userId: tutorUserIds }});
    tutors.forEach(tutor => {
        tutorDataList.push({tutor: tutor, person: tutorPersons.find( person => person.userId === tutor.userId )})
    });
    return tutorDataList;
}

module.exports = tutorService;