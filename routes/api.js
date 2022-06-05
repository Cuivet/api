//este archivo es el gestor para las rutas de la api

const router = require('express').Router();

const apiPetRouter = require('./api/pet');

router.use('/pet',apiPetRouter);

module.exports = router;