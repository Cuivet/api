const router = require('express').Router();
const specieService = require('../../services/specie.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const specie = await specieService.findAll();
    res.json(specie);
});


router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const specie = await specieService.findOne(req.params.id);
    res.json(specie);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newSpecie = await specieService.save(req.body);
    res.json(newSpecie);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedSpecie = await specieService.save(req.body);
    res.json(updatedSpecie);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await specieService.remove(req.params.id);
    res.json(response);
});

module.exports = router;