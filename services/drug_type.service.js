const { DrugType } = require("../models/db");

var drugTypeService = {
  findAll: findAll,
};

async function findAll() {
  return await DrugType.findAll();
}

module.exports = drugTypeService;
