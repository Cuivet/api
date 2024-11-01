const { VetHours } = require("../models/db");

var vetHoursService = {
  findAllByVetId: findAllByVetId,
};

async function findAllByVetId(vetId) {
  var vetHours = await VetHours.findAll({
    where: { vetId: vetId },
  });
  return vetHours;
}
module.exports = vetHoursService;
