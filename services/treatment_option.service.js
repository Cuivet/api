const { TreatmentOption } = require('../models/db');

var treatmentOptionService = {
    findAll: findAll
}

async function findAll(){
    return await TreatmentOption.findAll();
}

module.exports = treatmentOptionService;