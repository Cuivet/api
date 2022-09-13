const { Specie } = require('../models/db');

var specieService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
}

async function save(reqSpecie){
    var specie = Specie;
    if(reqSpecie.id){
        await Specie.update(reqSpecie, { where: { id: reqSpecie.id }});
        specie = await findOne(reqSpecie.id);
    } else{
        specie = await Specie.create(reqSpecie);
        specie = await findOne(specie.id);
    }
    return specie;
}

async function findOne(id){
    const specie = await Specie.findOne({
        where: { id: id }
    });
    return specie;
}

async function findAll(){
    const species = await Specie.findAll();
    return species;
}

async function remove(id){
    await Specie.destroy({
        where: { id: id }
    });
    return {message: 'Especie con id ' + id + ' borrada'};
}

module.exports = specieService;