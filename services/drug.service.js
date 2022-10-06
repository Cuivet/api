const { Drug } = require('../models/db');

var drugService = {
    findAll: findAll
}

async function findAll(){
    return await Drug.findAll();
}

module.exports = drugService;