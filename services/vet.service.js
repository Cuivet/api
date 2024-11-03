const { Vet, VetHours, VeterinaryAssociation, PetAssociation } = require("../models/db");
const veterinaryService = require("./veterinary.service");
const personService = require("./person.service");
const vetOwnerService = require("./vet_owner.service");
const moment = require("moment/moment");
const { Op } = require("sequelize");
const { findAllByVetId } = require("./vet_hours.service");

var temporalRegentAssociations = [];

var vetService = {
  save: save,
  findOne: findOne,
  findAll: findAll,
  remove: remove,
  findByFilter: findByFilter,
  findAllByVetOwnerId: findAllByVetOwnerId,
  saveTemporalAssociation: saveTemporalAssociation,
  findTemporalAssociationByCode: findTemporalAssociationByCode,
  findAllByRegentId: findAllByRegentId,
  findAllVetDataByIds: findAllVetDataByIds,
  deactivateVet: deactivateVet,
  activateVet: activateVet,
};

async function save(reqVet) {
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  var vet = Vet;
  if (reqVet.id) {
    await Vet.update(reqVet, { where: { id: reqVet.id } });
    vet = await findOne(reqVet.id);
    const existingHours = await VetHours.findAll({
      where: { vetId: reqVet.id },
    });
    const existingHoursMap = new Map(
      existingHours.map((hour) => [hour.dayOfWeek, hour])
    );

    for (const day of daysOfWeek) {
      const hour = reqVet.hours?.find((h) => h.dayOfWeek === day) || {
        dayOfWeek: day,
        openTime: null,
        closeTime: null,
      };
      if (existingHoursMap.has(day)) {
        await VetHours.update(
          {
            openTime: hour.openTime,
            closeTime: hour.closeTime,
          },
          {
            where: { vetId: reqVet.id, dayOfWeek: day },
          }
        );
        existingHoursMap.delete(day);
      } else {
        await VetHours.create({
          vetId: reqVet.id,
          dayOfWeek: day,
          openTime: hour.openTime,
          closeTime: hour.closeTime,
        });
      }
    }
    for (const hour of existingHoursMap.values()) {
      await VetHours.destroy({ where: { id: hour.id } });
    }
    if (reqVet.veterinaryId) {
      await VeterinaryAssociation.destroy({
        where: {
          vetId: reqVet.id,
          veterinaryId: reqVet?.veterinaryId,
        },
      });
    }
  } else {
    vet = await Vet.create(reqVet);
    vet = await findOne(vet.id);
    for (const day of daysOfWeek) {
      const hour = reqVet.hours.find((h) => h.dayOfWeek === day) || {
        dayOfWeek: day,
        openTime: null,
        closeTime: null,
      };
      await VetHours.create({
        vetId: vet.id,
        dayOfWeek: day,
        openTime: hour.openTime,
        closeTime: hour.closeTime,
      });
    }
    if (reqVet.veterinaryId) {
      await VeterinaryAssociation.destroy({
        where: {
          vetId: vet.id,
          veterinaryId: reqVet.veterinaryId,
        },
      });
    }
  }
  return vet;
}

async function findOne(id) {
  const vet = await Vet.findOne({
    where: { id: id },
  });
  return vet;
}

async function findByFilter(filter) {
  var vets = await Vet.findAll(filter);
  vets = vets ? vets : null;
  return vets;
}

async function findAll() {
  const vets = await Vet.findAll();
  const vetsWithDetails = await Promise.all(
    vets.map(async (vet) => {
      const hours = await findAllByVetId(vet.id);
      const cleanedHours = hours.map((hour) => ({
        dayOfWeek: hour.dayOfWeek,
        openTime: hour.openTime,
        closeTime: hour.closeTime,
      }));

      const vetOwner = await vetOwnerService.findOne(vet.vetOwnerId);
      const ownerDetails = await personService.findByUserId(vetOwner[0].userId);

      return { ...vet, hours: cleanedHours, owner: ownerDetails };
    })
  );
  return vetsWithDetails;
}

async function remove(id) {
  await Vet.destroy({
    where: { id: id },
  });
  await VeterinaryAssociation.destroy({
    where: { vetId: id },
  });
  await PetAssociation.destroy({
    where: { vetId: id },
  });
  return { message: "Vet con id " + id + " borrado" };
}

async function findAllByVetOwnerId(vetOwnerId) {
  const veterinaryAssociationService = require("./veterinary_association.service");
  const veterinaryService = require("./veterinary.service");
  const personService = require("./person.service");
  const vetData = [];

  const vets = await Vet.findAll({
    where: { vetOwnerId: vetOwnerId },
  });
  const veterinariesIds = vets
    .map((vet) => vet.veterinaryId)
    .filter((veterinaryId) => veterinaryId !== null);
  const vetsIds = vets.map((vet) => vet.id);
  const veterinaries = await veterinaryService.findByFilter({
    where: { id: veterinariesIds },
  });
  const userIds = veterinaries.map((veterinary) => veterinary.userId);
  const persons = await personService.findByFilter({
    where: { userId: userIds },
  });
  const asociaciones = await veterinaryAssociationService.findByFilter({
    where: { vetId: vetsIds },
  });

  if (vets.length) {
    for (const vet of vets) {
      let veterinary = null;
      let person = null;
      let coveterinaryData = [];

      if (vet.veterinaryId) {
        veterinary = veterinaries.find(
          (veterinary) => veterinary.id === vet.veterinaryId
        );
        person = persons.find((person) => person.userId === veterinary.userId);
      }

      const asociations = asociaciones.filter((a) => a.vetId === vet.id);
      const coVeterinariesIds = asociations
        .map((vet) => vet.veterinaryId)
        .filter((veterinaryId) => veterinaryId !== null);
      const coVeterinaries = await veterinaryService.findByFilter({
        where: { id: coVeterinariesIds },
      });
      const coUserIds = coVeterinaries.map((veterinary) => veterinary.userId);
      const coPersons = await personService.findByFilter({
        where: { userId: coUserIds },
      });

      if (asociations.length > 0) {
        for (const asociation of asociations) {
          const coveterinary = coVeterinaries.find(
            (v) => v.id === asociation.veterinaryId
          );
          const coperson = coPersons.find(
            (person) => person.userId === coveterinary.userId
          );
          coveterinaryData.push({
            coveterinary: coveterinary,
            coperson: coperson,
          });
        }
      }

      // Obtener los horarios de atención
      const hours = await findAllByVetId(vet.id);
      const cleanedHours = hours.map((hour) => ({
        dayOfWeek: hour.dayOfWeek,
        openTime: hour.openTime,
        closeTime: hour.closeTime,
        closed: !hour.openTime && !hour.closeTime,
      }));

      vetData.push({
        vet,
        veterinaryData: veterinary
          ? { veterinary: veterinary, person: person }
          : null,
        coveterinaryData: coveterinaryData.length ? coveterinaryData : null,
        hours: cleanedHours,
      });
    }
  }
  return vetData;
}

async function saveTemporalAssociation(reqRegentAssociation) {
  const temporalRegentAssociation = {
    mp: reqRegentAssociation.mp,
    vetId: reqRegentAssociation.vetId,
    code: "R" + Math.floor(100000 + Math.random() * 900000),
    time: moment(),
    expiresAt: moment().add(10, "minutes"),
  };
  temporalRegentAssociations.push(temporalRegentAssociation);
  return returnCompleteTemporalAssociation(temporalRegentAssociation);
}

async function findTemporalAssociationByCode(associationCode) {
  temporalRegentAssociation = temporalRegentAssociations.find(
    (temporalRegentAssociation) =>
      temporalRegentAssociation.code == associationCode
  );
  if (temporalRegentAssociation === undefined) {
    throw new Exception();
  }
  if (moment().isAfter(temporalRegentAssociation.expiresAt)) {
    throw new Error("Code has expired");
  }
  return returnCompleteTemporalAssociation(temporalRegentAssociation);
}

async function returnCompleteTemporalAssociation(temporalRegentAssociation) {
  const veterinary = await veterinaryService.findOneByMP(
    temporalRegentAssociation.mp
  );
  const veterinaryPerson = await personService.findByUserId(veterinary.userId);
  const vet = await Vet.findOne({
    where: { id: temporalRegentAssociation.vetId },
  });
  return {
    veterinaryData: { veterinary: veterinary, person: veterinaryPerson },
    vetData: { vet: vet },
    code: temporalRegentAssociation.code,
  };
}

async function findAllByRegentId(veterinaryId) {
  var vets = await Vet.findAll({
    where: { veterinaryId: veterinaryId },
  });
  vets = vets ? vets : null;
  return vets;
}

async function findAllVetDataByIds(ids) {
  vetDataList = [];
  var vets = await Vet.findAll({ where: { id: ids } });
  var regents = await veterinaryService.findAllVeterinaryDataByIds(
    vets
      .filter((vet) => vet.veterinaryId != null)
      .map((vet) => vet.veterinaryId)
  );
  vets.forEach((vet) => {
    vetDataList.push({
      vet: vet,
      regentData: vet.veterinaryId
        ? regents.find((regent) => regent.veterinary.id === vet.veterinaryId)
        : null,
    });
  });
  return vetDataList;
}

async function deactivateVet(id) {
  try {
    await Vet.update({ active: 0, veterinaryId: null }, { where: { id } });
    await VeterinaryAssociation.destroy({
      where: { vetId: id },
    });
    await PetAssociation.destroy({
      where: { vetId: id },
    });
  } catch (error) {
    throw new Error("Error deactivating vet");
  }
}

async function activateVet(id) {
  try {
    await Vet.update({ active: 1 }, { where: { id } });
  } catch (error) {
    throw new Error("Error activating vet");
  }
}
module.exports = vetService;
