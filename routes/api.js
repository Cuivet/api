//este archivo es el gestor para las rutas de la api
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
const apiPetAssociationRouter = require('./api/pet_association.route')

router.use('/user', apiUserRouter);
router.use('/person', middleware.checkToken, apiPersonRouter);
router.use('/veterinary', middleware.checkToken, apiVeterinaryRouter);
router.use('/tutor', middleware.checkToken, apiTutorRouter);
router.use('/vet-owner', middleware.checkToken, apiVetOwnerRouter);
router.use('/pet', middleware.checkToken, apiPetRouter); 
router.use('/vet', middleware.checkToken, apiVetRouter);
router.use('/pet-association', middleware.checkToken, apiPetAssociationRouter); 

module.exports = router;