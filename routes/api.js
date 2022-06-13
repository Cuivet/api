//este archivo es el gestor para las rutas de la api

const router = require('express').Router();

const middleware = require('./middleware')
const apiPetRouter = require('./api/pet');
const apiUserRouter = require('./api/user');

router.use('/pet', middleware.checkToken, apiPetRouter);
router.use('/user',apiUserRouter);

module.exports = router;