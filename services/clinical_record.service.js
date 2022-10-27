const { ClinicalRecord, Visit, Review, Anamnesis, PhysicalExam, PresumptiveDiagnosis, Diagnosis, Prognosis, AnamnesisItem, ComplementaryStudy, DiagnosisItemTreatment, DiagnosisItem, PresumptiveDiagnosisItem } = require('../models/db');
const veterinaryService = require('./veterinary.service');
const tutorService = require('./tutor.service');
const petService = require('./pet.service');
const vetService = require('./vet.service');

var clinicalRecordService = {
    create: create,
    save: save,
    findOne: findOne,
    findAllByVeterinary: findAllByVeterinary
}

async function create(clinicalRecord) {
    id = (await ClinicalRecord.create({petId: clinicalRecord.petId, vetId: clinicalRecord.vetId, veterinaryId: clinicalRecord.veterinaryId})).id;
    return findOne(id);
}

async function save(clinicalRecordDTO){
    if(!clinicalRecordDTO.id){
        newClinicalRecord = {
            petId: clinicalRecordDTO.pet.id,
            vetId: clinicalRecordDTO.vet.id,
            veterinaryId: clinicalRecordDTO.veterinaryData.veterinary.id
        }
        clinicalRecordDTO.id = (await ClinicalRecord.create(newClinicalRecord)).id;
    }

    newVisitIndex = clinicalRecordDTO.visits.findIndex((visit => visit.id == null));
    clinicalRecordDTO.visits[newVisitIndex].clinicalRecordId = clinicalRecordDTO.id;
    clinicalRecordDTO.visits[newVisitIndex].id = (await Visit.create(clinicalRecordDTO.visits[newVisitIndex])).id;

    if(clinicalRecordDTO.review && !clinicalRecordDTO.review.id){
        clinicalRecordDTO.review.visitId = clinicalRecordDTO.visits[newVisitIndex].id;
        clinicalRecordDTO.review.id = (await Review.create(clinicalRecordDTO.review)).id;
    }

    if(clinicalRecordDTO.anamnesis && !clinicalRecordDTO.anamnesis.id){
        clinicalRecordDTO.anamnesis.visitId = clinicalRecordDTO.visits[newVisitIndex].id;
        clinicalRecordDTO.anamnesis.id = (await Anamnesis.create(clinicalRecordDTO.anamnesis)).id;
        for (item of clinicalRecordDTO.anamnesis.anamnesisItems) {
            item.anamnesisId = clinicalRecordDTO.anamnesis.id;
            item.id = (await AnamnesisItem.create(item)).id;
        }
    }

    if(clinicalRecordDTO.physicalExam && !clinicalRecordDTO.physicalExam.id){
        clinicalRecordDTO.physicalExam.visitId = clinicalRecordDTO.visits[newVisitIndex].id;
        clinicalRecordDTO.physicalExam.id = (await PhysicalExam.create(clinicalRecordDTO.physicalExam)).id;
    }

    if(clinicalRecordDTO.presumptiveDiagnosis && !clinicalRecordDTO.presumptiveDiagnosis.id){
        clinicalRecordDTO.presumptiveDiagnosis.visitId = clinicalRecordDTO.visits[newVisitIndex].id;
        clinicalRecordDTO.presumptiveDiagnosis.id = (await PresumptiveDiagnosis.create(clinicalRecordDTO.presumptiveDiagnosis)).id;
        for (item of clinicalRecordDTO.presumptiveDiagnosis.presumptiveDiagnosisItems) {
            item.presumptiveDiagnosisId = clinicalRecordDTO.presumptiveDiagnosis.id;
            item.id = (await PresumptiveDiagnosisItem.create(item)).id;
        }
        for (study of clinicalRecordDTO.presumptiveDiagnosis.complementaryStudies) {
            study.presumptiveDiagnosisId = clinicalRecordDTO.presumptiveDiagnosis.id;
            study.id = (await ComplementaryStudy.create(study)).id;
        }
    }

    if(clinicalRecordDTO.diagnosis && !clinicalRecordDTO.diagnosis.id){
        clinicalRecordDTO.diagnosis.visitId = clinicalRecordDTO.visits[newVisitIndex].id;
        clinicalRecordDTO.diagnosis.id = (await Diagnosis.create(clinicalRecordDTO.diagnosis)).id;
        for (item of clinicalRecordDTO.diagnosis.diagnosisItems) {
            item.diagnosisId = clinicalRecordDTO.diagnosis.id;
            item.id = (await DiagnosisItem.create(item)).id;
            for (treatment of item.diagnosisItemTreatments){
                treatment.diagnosisItemId = item.id;
                treatment.id = (await DiagnosisItemTreatment.create(treatment)).id;
            }
        }
    }

    if(clinicalRecordDTO.prognosis && !clinicalRecordDTO.prognosis.id){
        clinicalRecordDTO.prognosis.visitId = clinicalRecordDTO.visits[newVisitIndex].id;
        clinicalRecordDTO.prognosis.id = (await Prognosis.create(clinicalRecordDTO.prognosis)).id;
    }

    return clinicalRecordDTO;
}

async function findOne(id){
    let clinicalRecordDTO = {};
    clinicalRecord = await ClinicalRecord.findOne({ where: { id: id }});
    clinicalRecordDTO.id = clinicalRecord.id;
    clinicalRecordDTO.createdAt = clinicalRecord.createdAt;
    clinicalRecordDTO.pet = await petService.findOne(clinicalRecord.petId);
    clinicalRecordDTO.vet = await vetService.findOne(clinicalRecord.vetId);
    clinicalRecordDTO.veterinaryData = await veterinaryService.findVeterinaryDataById(clinicalRecord.veterinaryId);
    clinicalRecordDTO.tutorData = await tutorService.findTutorDataById(clinicalRecordDTO.pet.tutorId);
    clinicalRecordDTO.visits = await Visit.findAll({where: { clinicalRecordId: clinicalRecordDTO.id }});
    clinicalRecordDTO.review = await Review.findOne({where: { visitId: clinicalRecordDTO.visits.map( visit => visit.id) }});
    clinicalRecordDTO.anamnesis = await Anamnesis.findOne({where: { visitId: clinicalRecordDTO.visits.map( visit => visit.id) }});
    if (clinicalRecordDTO.anamnesis && clinicalRecordDTO.anamnesis.id){
        clinicalRecordDTO.anamnesis.anamnesisItems = await AnamnesisItem.findAll({where: { anamnesisId: clinicalRecordDTO.anamnesis.id }});
    }
    clinicalRecordDTO.physicalExam = await PhysicalExam.findOne({where: { visitId: clinicalRecordDTO.visits.map( visit => visit.id) }});
    clinicalRecordDTO.presumptiveDiagnosis = await PresumptiveDiagnosis.findOne({where: { visitId: clinicalRecordDTO.visits.map( visit => visit.id) }});
    if (clinicalRecordDTO.presumptiveDiagnosis && clinicalRecordDTO.presumptiveDiagnosis.id){
        clinicalRecordDTO.presumptiveDiagnosis.presumptiveDiagnosisItems = await PresumptiveDiagnosisItem.findAll({where: { presumptiveDiagnosisId: clinicalRecordDTO.presumptiveDiagnosis.id }});
        clinicalRecordDTO.presumptiveDiagnosis.complementaryStudies = await ComplementaryStudy.findAll({where: { presumptiveDiagnosisId: clinicalRecordDTO.presumptiveDiagnosis.id }});
    }
    clinicalRecordDTO.diagnosis = await Diagnosis.findOne({where: { visitId: clinicalRecordDTO.visits.map( visit => visit.id) }});
    if (clinicalRecordDTO.diagnosis && clinicalRecordDTO.diagnosis.id){
        clinicalRecordDTO.diagnosis.diagnosisItems = await DiagnosisItem.findAll({where: { diagnosisId: clinicalRecordDTO.diagnosis.id }});
        for (diagnosisItem of clinicalRecordDTO.diagnosis.diagnosisItems) {
            diagnosisItem.diagnosisItemTreatments = await DiagnosisItemTreatment.findAll({where: { diagnosisItemId: diagnosisItem.id }});
        }
    }
    clinicalRecordDTO.prognosis = await Prognosis.findOne({where: { visitId: clinicalRecordDTO.visits.map( visit => visit.id) }});
    return clinicalRecordDTO;
}

async function findAllByVeterinary(veterinaryId){
    clinicalRecords = []
    clinicalRecordIds = (await ClinicalRecord.findAll({where: {veterinaryId: veterinaryId}})).map(clinicalRecord => clinicalRecord.id);
    for (clinicalRecordId of clinicalRecordIds) {
        clinicalRecords.push(await findOne(clinicalRecordId));
    }
    return clinicalRecords;
}

module.exports = clinicalRecordService;