const router = require('express').Router();
const veterinaryAssociationService = require('../../services/veterinary_association.service');

router.post('/register', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newVeterinaryAssociations = await veterinaryAssociationService.save(req.body);
    res.json(newVeterinaryAssociations);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await veterinaryAssociationService.remove(req.params.id);
    res.json(response);
});

router.get('/allDataByVeterinaryId/:veterinaryId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const veterinaryAssociations = await veterinaryAssociationService.findAllDataByVeterinaryId(req.params.veterinaryId);
    res.json(veterinaryAssociations);
});

router.post('/registerTemporalAssociation', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newTemporalVeterinaryAssociation = await veterinaryAssociationService.saveTemporalAssociation(req.body);
    res.json(newTemporalVeterinaryAssociation);
});

router.get('/temporalAssociationByCode/:code', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    try{
        res.json(await veterinaryAssociationService.findTemporalAssociationByCode(req.params.code));
    } catch (error) {
        if (error.message === "Code has expired") {
            res.status(410).send("El código ha expirado");
        } else {
            res.status(500).send("Asociación no existente");
        }
    }
});

router.get('/allDataByRegentOrVeterinary/:veterinaryId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const veterinaryAssociations = await veterinaryAssociationService.findAllDataByRegentOrVeterinary(req.params.veterinaryId);
    res.json(veterinaryAssociations);
});

router.get('/allCoVeterinariesDataByRegent/:veterinaryId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const veterinaryAssociations = await veterinaryAssociationService.findAllVeterinariesByRegentId(req.params.veterinaryId);
    res.json(veterinaryAssociations);
});

module.exports = router;