const router = require('express').Router();
const vaccinationService = require('../../services/vaccination.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vacs = await vaccinationService.findAll();
    res.json(vacs);
});

router.get('/allByPetId/:petId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vacs = await vaccinationService.findAllByPetId(req.params.petId);
    res.json(vacs);
});

router.get('/allByVeterinaryId/:veterinaryId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vacs = await vaccinationService.findAllByVeterinaryId(req.params.veterinaryId);
    res.json(vacs);
});


router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vac = await vaccinationService.findOne(req.params.id);
    res.json(vac);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    try{
        const newVaccination = await vaccinationService.create(req.body);
        res.json(newVaccination);
    } catch {
        res.status(500).send('Información incorrecta');
    }   
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedVaccination = await vaccinationService.save(req.body);
    res.json(updatedVaccination);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await vaccinationService.remove(req.params.id);
    res.json(response);
});

module.exports = router;