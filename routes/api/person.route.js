const router = require('express').Router();

const { Person } = require('../../models/db');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const persons = await Person.findAll();
    res.json(persons);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const person = await Person.findAll({
        where: { id: req.params.id }
    });
    res.json(person);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newPerson = await Person.create(req.body);
    res.json(newPerson);
});

router.put('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    await Person.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({message: 'Person con id ' + req.params.id + ' actualizado'});
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    await Person.destroy({
        where: { id: req.params.id }
    });
    res.json({message: 'Person con id ' + req.params.id + ' borrado'});
});

module.exports = router;