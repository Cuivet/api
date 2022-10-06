const { AnamnesisQuestion } = require('../models/db');

var anamnesisQuestionService = {
    findAll: findAll
}

async function findAll(){
    return await AnamnesisQuestion.findAll();
}

module.exports = anamnesisQuestionService;