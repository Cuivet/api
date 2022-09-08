const router = require('express').Router();
const petService = require('../../services/pet.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const pets = await petService.findAll();
    res.json(pets);
});

router.get('/allByTutorId/:tutorId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const pets = await petService.findByTutorId(req.params.tutorId);
    res.json(pets);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const pet = await petService.findOne(req.params.id);
    res.json(pet);
});

router.post('/register', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newPet = await petService.save(req.body);
    res.json(newPet);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedPet = await petService.save(req.body);
    res.json(updatedPet);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await petService.remove(req.params.id);
    res.json(response);
});

module.exports = router;