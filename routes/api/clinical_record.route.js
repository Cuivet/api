const router = require('express').Router();
const clinicalRecordService = require('../../services/clinical_record.service');

router.get('/allByVeterinaryId/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const clinicalRecords = await clinicalRecordService.findAllByVeterinary(req.params.id);
    res.json(clinicalRecords);
});
router.get('/allByTutorId/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const clinicalRecords = await clinicalRecordService.findAllByTutor(req.params.id);
    res.json(clinicalRecords);
});

router.get('/allByTutor/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const clinicalRecords = await clinicalRecordService.findAllByVeterinary(req.params.id);
    res.json(clinicalRecords);
});
router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const clinicalRecord = await clinicalRecordService.findOne(req.params.id);
    res.json(clinicalRecord);
});

router.post('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    try{
        const newclinicalRecord = await clinicalRecordService.create(req.body);
        res.json(newclinicalRecord);
    } catch {
        res.status(500).send('Información incorrecta');
    }    
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedclinicalRecord = await clinicalRecordService.save(req.body);
    res.json(updatedclinicalRecord);
});

router.get('/allByPetId/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const clinicalRecords = await clinicalRecordService.findAllByPet(req.params.id);
    res.json(clinicalRecords);
});

router.get('/allCRByPetIds/:ids', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const clinicalRecords = await clinicalRecordService.findAllCRByPetIds(req.params.id);
    res.json(clinicalRecords);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const response = await clinicalRecordService.remove(req.params.id);
    res.json(response);
});

module.exports = router;