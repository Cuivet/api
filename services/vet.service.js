const { Vet } = require('../models/db');
const veterinaryService = require('./veterinary.service');
const personService = require('./person.service');
const moment = require('moment/moment');

var temporalRegentAssociations = [];

var vetService = {
    save: save,
    findOne: findOne,
    findAll: findAll,
    remove: remove,
    findByFilter: findByFilter,
    findAllByVetOwnerId: findAllByVetOwnerId,
    saveTemporalAssociation: saveTemporalAssociation,
    findTemporalAssociationByCode: findTemporalAssociationByCode,
    findAllByRegentId: findAllByRegentId,
    findAllVetDataByIds: findAllVetDataByIds
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
    const vet = await Vet.findOne({
        where: { id: id }
    });
    return vet;
}

async function findByFilter(filter){
    var vets = await Vet.findAll(filter);
    vets = vets ? vets : null;
    return vets;
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

//findAllVetsDataByVetOwnerId //dejaría de usarlo y usaría solo lo que haga en veterinariesassociatios. Esta la usaba para que el owner vea a quienes tiene como regente en cada una de sus vets
async function findAllByVetOwnerId(vetOwnerId){
    vetData = [];
    var vets = await Vet.findAll({ where: { vetOwnerId: vetOwnerId }});
    const veterinariesIds = vets.map( vet => vet.veterinaryId);
    const veterinaries = await veterinaryService.findByFilter({where: { id: veterinariesIds }});
    const userIds = veterinaries.map( veterinary => veterinary.userId);
    const persons = await personService.findByFilter({where: { userId: userIds }});
    if (vets.length) {
        vets.forEach(vet => {
            var veterinary = null;
            var person = null;
            if (vet.veterinaryId) {
                veterinary = veterinaries.filter(veterinary => veterinary.id === vet.veterinaryId)[0];
                person = persons.filter(person => person.userId === veterinary.userId)[0];
            }
            vetData.push({
                vet,
                veterinaryData: veterinary ? {veterinary:veterinary, person:person} : null
            });
        });
    }
    return vetData;
}

async function saveTemporalAssociation(reqRegentAssociation){
    const temporalRegentAssociation = {
        mp: reqRegentAssociation.mp,
        vetId: reqRegentAssociation.vetId,
        code: 'R'+Math.floor(100000 + Math.random() * 900000),
        time: moment()
    }
    temporalRegentAssociations.push(temporalRegentAssociation);
    return returnCompleteTemporalAssociation(temporalRegentAssociation);
}

async function findTemporalAssociationByCode(associationCode){
    temporalRegentAssociation = temporalRegentAssociations.find(temporalRegentAssociation => temporalRegentAssociation.code == associationCode);
    if( temporalRegentAssociation === undefined ){
        throw new Exception();
    }
    return returnCompleteTemporalAssociation(temporalRegentAssociation);
}

async function returnCompleteTemporalAssociation(temporalRegentAssociation){
    const veterinary = await veterinaryService.findOneByMP(temporalRegentAssociation.mp);
    const veterinaryPerson = await personService.findByUserId(veterinary.userId);
    const vet = await Vet.findOne({
        where : {id:temporalRegentAssociation.vetId}
    })
    return  {   veterinaryData: { veterinary: veterinary, person: veterinaryPerson },
                vetData: { vet: vet},
                code: temporalRegentAssociation.code
            };
}

async function findAllByRegentId(veterinaryId){
    var vets = await Vet.findAll({
        where: { veterinaryId: veterinaryId }
    });
    vets = vets ? vets : null;
    return vets;
}

async function findAllVetDataByIds(ids) {
    vetDataList = [];
    var vets = await Vet.findAll({ where: { id:ids } });
    var regents = await veterinaryService.findAllVeterinaryDataByIds(vets.filter( vet => vet.veterinaryId != null ).map( vet => vet.veterinaryId ));
    vets.forEach( vet => {
        vetDataList.push(
            {
                vet: vet,
                regentData: vet.veterinaryId ? regents.find(regent => regent.veterinary.id === vet.veterinaryId) : null
            }
        )
    });
    return vetDataList;
}

module.exports = vetService;