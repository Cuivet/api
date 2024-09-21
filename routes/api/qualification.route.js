const router = require('express').Router();
const qualificationService = require('../../services/qualification.service');

router.post('/register', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newQualification = await qualificationService.save(req.body);
    res.json(newQualification);
});

// router.delete('/:id', async (req,res) => {
//     console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
//     const response = await qualificationService.remove(req.params.id);
//     res.json(response);
// });

router.get('/allByVeterinaryId/:veterinaryId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const qualifications = await qualificationService.findAllByVeterinaryId(req.params.veterinaryId);
    res.json(qualifications);
});//Obtiene las calificaciones del veterinario que registró la 

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const qualification = await qualificationService.findOneById(req.params.id);
    res.json(qualification);
});

router.get('/allByTutorId/:tutorId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const qualifications = await qualificationService.findAllByTutorId(req.params.tutorId);
    res.json(qualifications);
});

module.exports = router;