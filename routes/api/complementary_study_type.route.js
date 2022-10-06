const router = require('express').Router();
const complementaryStudyTypeService = require('../../services/anamnesis_question.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const complementaryStudyTypes = await complementaryStudyTypeService.findAll();
    res.json(complementaryStudyTypes);
});

module.exports = router;