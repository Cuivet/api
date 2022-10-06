const { DiagnosisType } = require('../models/db');

var diagnosisTypeService = {
    findAll: findAll
}

async function findAll(){
    return await DiagnosisType.findAll();
}

module.exports = diagnosisTypeService;