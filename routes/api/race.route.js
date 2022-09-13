const router = require('express').Router();
const raceService = require('../../services/race.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const race = await raceService.findAll();
    res.json(race);
});

router.get('/allBySpecieId/:specieId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const race = await raceService.findBySpecieId(req.params.specieId);
    res.json(race);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const race = await raceService.findOne(req.params.id);
    res.json(race);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newRace = await raceService.save(req.body);
    res.json(newRace);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedRace = await raceService.save(req.body);
    res.json(updatedRace);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await raceService.remove(req.params.id);
    res.json(response);
});

module.exports = router;