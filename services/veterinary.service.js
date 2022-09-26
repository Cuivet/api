const { Veterinary } = require('../models/db');

var veterinaryService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByUserId: findByUserId,
    findByFilter: findByFilter,
    findOneByMP: findOneByMP
}

async function save(reqVeterinary){
    var veterinary = Veterinary;
    if(reqVeterinary.id){
        await Veterinary.update(reqVeterinary, { where: { id: reqVeterinary.id }});
        veterinary = await findOne(reqVeterinary.id);
    } else{
        veterinary = await Veterinary.create(reqVeterinary);
        veterinary = await findOne(veterinary.id);
    }
    return veterinary;
}

async function findOne(id){
    const veterinary = await Veterinary.findOne({
        where: { id: id }
    });
    return veterinary;
}

async function findOneByMP(mp){
    const veterinary = await Veterinary.findOne({
        where: { mp: mp }
    });
    return veterinary;
}

async function findAll(){
    const veterinaries = await Veterinary.findAll();
    return veterinaries;
}

async function remove(id){
    await Veterinary.destroy({
        where: { id: id }
    });
    return {message: 'Veterinary con id ' + id + ' borrado'};
}

async function findByUserId(userId){
    var veterinary = await Veterinary.findOne({
        where: { userId: userId }
    });
    veterinary = veterinary ? veterinary : null;
    return veterinary;
}

async function findByFilter(filter){
    var veterinaries = await Veterinary.findAll(filter);
    veterinaries = veterinaries ? veterinaries : null;
    return veterinaries;
}

module.exports = veterinaryService;