const { HairColor } = require('../models/db');

var hairColorService = {
    findAll: findAll
}

async function findAll(){
    return await HairColor.findAll();
}

module.exports = hairColorService;