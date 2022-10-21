const { PetSize } = require('../models/db');

var PetSizeService = {
    findAll: findAll
}

async function findAll(){
    return await PetSize.findAll();
}

module.exports = PetSizeService;