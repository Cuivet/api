const { Race } = require('../models/db');

var raceService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findBySpecieId: findBySpecieId
}

async function save(reqRace){
    var race = Race;
    if(reqRace.id){
        await Race.update(reqRace, { where: { id: reqRace.id }});
        race = await findOne(reqRace.id);
    } else{
        race = await Race.create(reqRace);
        race = await findOne(race.id);
    }
    return race;
}

async function findOne(id){
    const race = await Race.findOne({
        where: { id: id }
    });
    return race;
}

async function findAll(){
    const races = await Race.findAll();
    return races;
}

async function remove(id){
    await Race.destroy({
        where: { id: id }
    });
    return {message: 'Raza con id ' + id + ' borrada'};
}

async function findBySpecieId(specieId){
    var race = await Race.findAll({
        where: { specieId: specieId }
    });
    return race;
}

module.exports = raceService;