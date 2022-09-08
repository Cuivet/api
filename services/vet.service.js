const { Vet } = require('../models/db');

var vetService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findAllByVetOwnerId: findAllByVetOwnerId
}

async function save(reqVet){
    var vet = Vet;
    if(reqVet.id){
        await Vet.update(reqVet, { where: { id: reqVet.id }});
        vet = await findOne(reqVet.id);
    } else{
        vet = await Vet.create(reqVet);
        vet = await findOne(vet.id);
    }
    return vet;
}

async function findOne(id){
    const vet = await Vet.findAll({
        where: { id: id }
    });
    return vet;
}

async function findAll(){
    const vets = await Vet.findAll();
    return vets;
}

async function remove(id){
    await Vet.destroy({
        where: { id: id }
    });
    return {message: 'Vet con id ' + id + ' borrado'};
}

async function findAllByVetOwnerId(vetOwnerId){
    var vet = await Vet.findAll({
        where: { vetOwnerId: vetOwnerId }
    });
    return vet;
}

module.exports = vetService;