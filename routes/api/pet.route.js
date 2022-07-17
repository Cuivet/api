const router = require('express').Router();

const { Pet } = require('../../models/db');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const pets = await Pet.findAll();
    res.json(pets);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const pet = await Pet.findAll({
        where: { id: req.params.id }
    });
    res.json(pet);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newPet = await Pet.create(req.body);
    res.json(newPet);
});

router.put('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    await Pet.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({message: 'Pet con id ' + req.params.id + ' actualizado'});
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    await Pet.destroy({
        where: { id: req.params.id }
    });
    res.json({message: 'Pet con id ' + req.params.id + ' borrado'});
});

module.exports = router;