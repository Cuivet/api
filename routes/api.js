const router = require('express').Router();
const middleware = require('./middleware');

var cors = require('cors');
router.use(cors());

const apiUserRouter = require('./api/user.route');
const apiPersonRouter = require('./api/person.route');
const apiVeterinaryRouter = require('./api/veterinary.route');
const apiTutorRouter = require('./api/tutor.route');
const apiVetOwnerRouter = require('./api/vet_owner.route');
const apiPetRouter = require('./api/pet.route');
const apiVetRouter = require('./api/vet.route');
const apiRaceRouter = require('./api/race.route');
const apiSpecieRouter = require('./api/specie.route');
const apiPetAssociationRouter = require('./api/pet_association.route');
const apiClinicalRecordRouter = require('./api/clinical_record.route');
const apiAnamnesisQuestionRouter = require('./api/anamnesis_question.route');
const apiComplementaryStudyTypeRouter = require('./api/complementary_study_type.route');
const apiDiagnosisTypeRouter = require('./api/diagnosis_type.route');
const apiDrugRouter = require('./api/drug.route');
const apiTreatmentTypeRouter = require('./api/treatment_type.route');
const apiHairColorRouter = require('./api/hair_color.route');
const apiHairLengthRouter = require('./api/hair_length.route');
const apiPetSizeRouter = require('./api/pet_size.route');

router.use('/user', apiUserRouter);
router.use('/person', middleware.checkToken, apiPersonRouter);
router.use('/veterinary', middleware.checkToken, apiVeterinaryRouter);
router.use('/tutor', middleware.checkToken, apiTutorRouter);
router.use('/vet-owner', middleware.checkToken, apiVetOwnerRouter);
router.use('/pet', middleware.checkToken, apiPetRouter); 
router.use('/vet', middleware.checkToken, apiVetRouter);
router.use('/race', middleware.checkToken, apiRaceRouter);
router.use('/specie', middleware.checkToken, apiSpecieRouter);
router.use('/pet-association', middleware.checkToken, apiPetAssociationRouter);
router.use('/clinical-record', middleware.checkToken, apiClinicalRecordRouter);
router.use('/anamnesis-question', middleware.checkToken, apiAnamnesisQuestionRouter);
router.use('/complementary-study-type', middleware.checkToken, apiComplementaryStudyTypeRouter);
router.use('/diagnosis-type', middleware.checkToken, apiDiagnosisTypeRouter);
router.use('/drug', middleware.checkToken, apiDrugRouter);
router.use('/treatment-type', middleware.checkToken, apiTreatmentTypeRouter);
router.use('/hair-color', middleware.checkToken, apiHairColorRouter);
router.use('/hair-length', middleware.checkToken, apiHairLengthRouter);
router.use('/pet-size', middleware.checkToken, apiPetSizeRouter);

module.exports = router;