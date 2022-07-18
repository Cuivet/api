const { Tutor } = require('../models/db');

var tutorService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove
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
    const tutor = await Tutor.findAll({
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

module.exports = tutorService;