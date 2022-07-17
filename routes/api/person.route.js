const router = require('express').Router();

const { Person } = require('../../models/db');

router.get('/all', async (req,res) => {
    console.log('PETICION RECIBIDA: GET en el endpoint /api/person/all para traer todos las Person');
    const persons = await Person.findAll();
    console.log('Consulta exitosa!');
    res.json(persons);
});

router.get('/:id', async (req,res) => {
    const person = await Person.findAll({
        where: { id: req.params.id }
    });
    res.json(person);
});

router.post('/', async (req,res) => {
    const newPerson = await Person.create(req.body);
    res.json(newPerson);
});

router.put('/:id', async (req,res) => {
    await Person.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({message: 'Person con id ' + req.params.id + ' actualizado'});
});

router.delete('/:id', async (req,res) => {
    await Person.destroy({
        where: { id: req.params.id }
    });
    res.json({message: 'Person con id ' + req.params.id + ' borrado'});
});

module.exports = router;