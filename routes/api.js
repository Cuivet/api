//este archivo es el gestor para las rutas de la api

const router = require('express').Router();

const middleware = require('./middleware')
const apiPetRouter = require('./api/pet.route');
const apiPersonRouter = require('./api/person.route');
const apiUserRouter = require('./api/user.route');

router.use('/pet', middleware.checkToken, apiPetRouter);
router.use('/person', middleware.checkToken, apiPersonRouter);
router.use('/user',apiUserRouter);

module.exports = router;