const { VetOwner } = require('../models/db');

var vetOwnerService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByUserId: findByUserId
}

async function save(reqVetOwner){
    var vetOwner = VetOwner;
    if(reqVetOwner.id){
        await VetOwner.update(reqVetOwner, { where: { id: reqVetOwner.id }});
        vetOwner = await findOne(reqVetOwner.id);
    } else{
        vetOwner = await VetOwner.create(reqVetOwner);
        vetOwner = await findOne(vetOwner.id);
    }
    return vetOwner;
}

async function findOne(id){
    const vetOwner = await VetOwner.findAll({
        where: { id: id }
    });
    return vetOwner;
}

async function findAll(){
    const vetOwners = await VetOwner.findAll();
    return vetOwners;
}

async function remove(id){
    await VetOwner.destroy({
        where: { id: id }
    });
    return {message: 'VetOwner con id ' + id + ' borrado'};
}

async function findByUserId(userId){
    var vetOwner = await VetOwner.findAll({
        where: { userId: userId }
    });
    vetOwner = vetOwner.length ? vetOwner[0] : null;
    return vetOwner;
}

module.exports = vetOwnerService;