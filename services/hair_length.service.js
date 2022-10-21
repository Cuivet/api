const { HairLength } = require('../models/db');

var hairLengthService = {
    findAll: findAll
}

async function findAll(){
    return await HairLength.findAll();
}

module.exports = hairLengthService;