const router = require('express').Router();
const diagnosisTypeService = require('../../services/diagnosis_type.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const diagnosisTypes = await diagnosisTypeService.findAll();
    res.json(diagnosisTypes);
});

module.exports = router;