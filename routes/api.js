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
const apiPetAssociationRouter = require('./api/pet_association.route')
const apiClinicalRecordRouter = require('./api/clinical_record.route')

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

module.exports = router;