const router = require('express').Router();

const { Pet } = require('../../db');

router.get('/all', async (req,res) => {
    console.log('PETICION RECIBIDA: GET en el endpoint /api/pet/all para traer todos los Pet');
    const pets = await Pet.findAll();
    console.log('Consulta exitosa!');
    res.json(pets);
});

router.get('/:id', async (req,res) => {
    const pet = await Pet.findAll({
        where: { id: req.params.id }
    });
    res.json(pet);
});

router.post('/', async (req,res) => {
    const newPet = await Pet.create(req.body);
    res.json(newPet);
});

router.put('/:id', async (req,res) => {
    await Pet.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({message: 'Pet con id ' + req.params.id + ' actualizado'});
});

router.delete('/:id', async (req,res) => {
    await Pet.destroy({
        where: { id: req.params.id }
    });
    res.json({message: 'Pet con id ' + req.params.id + ' borrado'});
});

module.exports = router;