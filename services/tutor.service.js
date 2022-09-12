const { Tutor } = require('../models/db');

var tutorService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByUserId: findByUserId
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

module.exports = tutorService;