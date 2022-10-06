const { ComplementaryStudyType } = require('../models/db');

var complementaryStudyTypeService = {
    findAll: findAll
}

async function findAll(){
    return await ComplementaryStudyType.findAll();
}

module.exports = complementaryStudyTypeService;