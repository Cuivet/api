const router = require('express').Router();
const vetService = require('../../services/vet.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vet = await vetService.findAll();
    res.json(vet);
});

router.get('/allByVetOwnerId/:vetOwnerId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vet = await vetService.findAllByVetOwnerId(req.params.vetOwnerId);
    res.json(vet);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vet = await vetService.findOne(req.params.id);
    res.json(vet);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newVet = await vetService.save(req.body);
    res.json(newVet);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedVet = await vetService.save(req.body);
    res.json(updatedVet);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await vetService.remove(req.params.id);
    res.json(response);
});

module.exports = router;