const router = require('express').Router();
const vetOwnerService = require('../../services/vet_owner.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vetOwners = await vetOwnerService.findAll();
    res.json(vetOwners);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const vetOwner = await vetOwnerService.findOne(req.params.id);
    res.json(vetOwner);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newVetOwner = await vetOwnerService.save(req.body);
    res.json(newVetOwner);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedVetOwner = await vetOwnerService.save(req.body);
    res.json(updatedVetOwner);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await vetOwnerService.remove(req.params.id);
    res.json(response);
});

module.exports = router;