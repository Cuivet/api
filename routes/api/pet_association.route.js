const router = require('express').Router();
const petAssociationService = require('../../services/pet_association.service');

router.post('/register', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newPetAssociations = await petAssociationService.save(req.body);
    res.json(newPetAssociations);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await petAssociationService.remove(req.params.id);
    res.json(response);
});

router.get('/allByPetId/:petId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const petAssociations = await petAssociationService.findAllByPetId(req.params.petId);
    res.json(petAssociations);
});

router.get('/allByTutorId/:tutorId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const petAssociations = await petAssociationService.findAllDataByTutorId(req.params.tutorId);
    res.json(petAssociations);
});

router.get('/allByVeterinaryId/:veterinaryId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const petAssociations = await petAssociationService.findAllDataByVeterinaryId(req.params.veterinaryId);
    res.json(petAssociations);
});

router.get('/allByVetId/:vetId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const petAssociations = await petAssociationService.findAllDataByVetId(req.params.vetId);
    res.json(petAssociations);
});

router.post('/registerTemporalAssociation', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newTemporalPetAssociation = await petAssociationService.saveTemporalAssociation(req.body);
    res.json(newTemporalPetAssociation);
});

router.get('/temporalAssociationByCode/:code', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    try{
        res.json(await petAssociationService.findTemporalAssociationByCode(req.params.code));
    } catch {
        res.status(500).send('Asociación no existente');
    }
});

module.exports = router;