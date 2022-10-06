const router = require('express').Router();
const treatmentTypeService = require('../../services/anamnesis_question.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const treatmentTypes = await treatmentTypeService.findAll();
    res.json(treatmentTypes);
});

module.exports = router;