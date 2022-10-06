const { TreatmentType } = require('../models/db');

var treatmentTypeService = {
    findAll: findAll
}

async function findAll(){
    return await TreatmentType.findAll();
}

module.exports = treatmentTypeService;