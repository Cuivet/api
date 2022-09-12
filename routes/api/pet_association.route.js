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

router.get('/allByVeterinaryId/:veterinaryId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const petAssociations = await petAssociationService.findAllByVeterinaryId(req.params.veterinaryId);
    res.json(petAssociations);
});

router.post('/registerTemporalAssociation', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newTemporalPetAssociation = await petAssociationService.saveTemporalAssociation(req.body);
    res.json(newTemporalPetAssociation);
});

router.get('/temporalAssociationByCode/:code', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const temporalPetAssociation = await petAssociationService.findTemporalAssociationByCode(req.params.code);
    res.json(temporalPetAssociation);
});

module.exports = router;