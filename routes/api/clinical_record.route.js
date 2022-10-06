const router = require('express').Router();
const clinicalRecordService = require('../../services/clinical_record.service');

router.get('/allByVeterinaryId/:id', async (req,res) => {
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
    const newclinicalRecord = await clinicalRecordService.save(req.body);
    res.json(newclinicalRecord);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const updatedclinicalRecord = await clinicalRecordService.save(req.body);
    res.json(updatedclinicalRecord);
});

module.exports = router;