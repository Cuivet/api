const router = require('express').Router();
const tutorService = require('../../services/tutor.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const tutors = await tutorService.findAll();
    res.json(tutors);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const tutor = await tutorService.findOne(req.params.id);
    res.json(tutor);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newTutor = await tutorService.save(req.body);
    res.json(newTutor);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedTutor = await tutorService.save(req.body);
    res.json(updatedTutor);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await tutorService.remove(req.params.id);
    res.json(response);
});

module.exports = router;