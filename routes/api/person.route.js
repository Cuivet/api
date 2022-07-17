const router = require('express').Router();
const personService = require('../../services/person.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const persons = await personService.findAll();
    res.json(persons);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const person = await personService.findOne(req.params.id);
    res.json(person);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newPerson = await personService.save(req.body);
    res.json(newPerson);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedPerson = await personService.save(req.body);
    res.json(updatedPerson);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await personService.remove(req.params.id);
    res.json(response);
});

module.exports = router;