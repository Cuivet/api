const { Person } = require('../models/db');

var personService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByUserId: findByUserId
}

async function save(reqPerson){
    var person = Person;
    if(reqPerson.id){
        await Person.update(reqPerson, { where: { id: reqPerson.id }});
        person = await findOne(reqPerson.id);
    } else{
        person = await Person.create(reqPerson);
        person = await findOne(person.id);
    }
    return person;
}

async function findOne(id){
    const person = await Person.findAll({
        where: { id: id }
    });
    return person;
}

async function findAll(){
    const persons = await Person.findAll();
    return persons;
}

async function remove(id){
    await Person.destroy({
        where: { id: id }
    });
    return {message: 'Person con id ' + id + ' borrado'};
}

async function findByUserId(userId){
    var person = await Person.findAll({
        where: { userId: userId }
    });
    person = person.length ? person[0] : null;
    return person;
}

module.exports = personService;