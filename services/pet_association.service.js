const moment = require("moment/moment");
const { PetAssociation, Pet } = require("../models/db");
const veterinaryService = require("./veterinary.service");
const petService = require("./pet.service");
const personService = require("./person.service");
const tutorService = require("./tutor.service");
const { Op } = require("sequelize");
const vetService = require("./vet.service");

var petAssociationService = {
	save: save,
	remove: remove,
	findAllByPetId: findAllByPetId,
	findAllDataByTutorId: findAllDataByTutorId,
	findAllDataByVeterinaryId: findAllDataByVeterinaryId,
	findAllDataByVetId: findAllDataByVetId,
	saveTemporalAssociation: saveTemporalAssociation,
	findTemporalAssociationByCode: findTemporalAssociationByCode,
};

var temporalPetAssociations = [];

async function save(reqPetAssociations) {
	const existentPetAssociations = await PetAssociation.findAll({
		where: { [Op.or]: reqPetAssociations },
	});
	existentPetAssociations.forEach((epa) => {
		reqPetAssociations = reqPetAssociations.filter(
			(rpa) => rpa.petId != epa.petId && epa.veterinaryId != epa.veterinaryId
		);
	});
	reqPetAssociations.forEach(async function eachPetAssociation(petAssociation) {
		await PetAssociation.create(petAssociation);
	});
	return await PetAssociation.findAll({
		where: { [Op.or]: reqPetAssociations },
	});
}

async function remove(id) {
	await PetAssociation.destroy({
		where: { id: id },
	});
	return { message: "PetAssociation con id " + id + " borrado" };
}

async function findAllByPetId(petId) {
	var petAssociation = await PetAssociation.findAll({
		where: { petId: petId },
	});
	return petAssociation;
}

async function findAllDataByTutorId(tutorId) {
	return findAllPetAssociationData(null, tutorId, null);
}

async function findAllDataByVeterinaryId(veterinaryId) {
	return findAllPetAssociationData(veterinaryId, null, null);
}

async function findAllDataByVetId(vetId) {
	return findAllPetAssociationData(null, null, vetId);
}

async function findAllPetAssociationData(veterinaryId, tutorId, vetId) {
	let petAssociations = 	[];
	let pets = [];

	if (veterinaryId) {
		petAssociations = await PetAssociation.findAll({
			where: { veterinaryId: veterinaryId },
		});
		const petIds = petAssociations.map(
			(petAssociation) => petAssociation.petId
		);
		pets = await petService.findByFilter({ where: { id: petIds } });
	}
	if (tutorId) {
		pets = await petService.findByTutorId(tutorId);
		const petByTutorIds = pets.map((pet) => pet.id);
		petAssociations = await PetAssociation.findAll({
			where: { petId: petByTutorIds },
		});
	}
	if (vetId) {
		petAssociations = await PetAssociation.findAll({
			where: { vetId: vetId },
		});
		const petIds = petAssociations.map(
			(petAssociation) => petAssociation.petId
		);
		pets = await petService.findByFilter({ where: { id: petIds } });
	}

	tutorDataList = await tutorService.findAllTutorDataByIds(
		pets.map((pet) => pet.tutorId)
	);
	veterinaryDataList = await veterinaryService.findAllVeterinaryDataByIds(
		petAssociations.map((petAssociation) => petAssociation.veterinaryId)
	);
	vets = await vetService.findAll();
	var petAssociationDataList = [];
	petAssociations.forEach(async function eachPet(petAssociation) {
		pet = pets.find((pet) => pet.id === petAssociation.petId);
		if (petAssociation.vetId === null) {
			vetData = {
				//name: "Atención particular de: " +  veterinaryDataList.find(veterinaryData => veterinaryData.veterinary.id === petAssociation.veterinaryId).person.name + " " +veterinaryDataList.find(veterinaryData => veterinaryData.veterinary.id === petAssociation.veterinaryId).person.lastName,
				name: "Atención particular",
			};
		} else {
			vetData = vets.find((vetData) => vetData.id === petAssociation.vetId);
		}
		petAssociationDataList.push({
			veterinaryData: veterinaryDataList.find(
				(veterinaryData) =>
					veterinaryData.veterinary.id === petAssociation.veterinaryId
			),
			tutorData: tutorDataList.find(
				(tutorData) => tutorData.tutor.id === pet.tutorId
			),
			pet: pet,
			associationId: petAssociation.id,
			associationDate: petAssociation.createdAt,
			vetData: vetData,
		});
	});
	return petAssociationDataList;
}

async function saveTemporalAssociation(reqPetAssociation) {
	const temporalPetAssociation = {
		tutorDni: reqPetAssociation.tutorDni,
		veterinaryId: reqPetAssociation.veterinaryId,
		vetId: reqPetAssociation?.vetId,
		code: Math.floor(100000 + Math.random() * 900000),
		expiresAt: moment().add(10, "minutes")
	};
	temporalPetAssociations.push(temporalPetAssociation);
	return returnCompleteTemporalAssociation(temporalPetAssociation);
}

async function findTemporalAssociationByCode(associationCode) {
	temporalPetAssociation = temporalPetAssociations.find(
		(temporalPetAssociation) => temporalPetAssociation.code == associationCode
	);
	if (temporalPetAssociation === undefined) {
		throw new Exception();
	}
	if (moment().isAfter(temporalPetAssociation.expiresAt)) {
		throw new Error('Code has expired');
	}
	return returnCompleteTemporalAssociation(temporalPetAssociation);
}

async function returnCompleteTemporalAssociation(temporalPetAssociation) {
	const veterinary = await veterinaryService.findOne(
		temporalPetAssociation.veterinaryId
	);
	const veterinaryPerson = await personService.findByUserId(veterinary.userId);
	const tutorPerson = await personService.findOneByDni(
		temporalPetAssociation.tutorDni
	);
	let vetData = {}; 
	if(!temporalPetAssociation.vetId){
		vetData =  {
			id: null,
			name: "Atención Particular",
		};
	} else {
		vetData = await vetService.findOne(temporalPetAssociation?.vetId);
	}
	const tutor = await tutorService.findByUserId(tutorPerson.userId);
	return {
		veterinaryData: { veterinary: veterinary, person: veterinaryPerson },
		tutorData: { tutor: tutor, person: tutorPerson },
		code: temporalPetAssociation.code,
		vetData: vetData,
	};
}

module.exports = petAssociationService;
