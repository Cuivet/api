const router = require('express').Router();
const drugService = require('../../services/anamnesis_question.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const drugs = await drugService.findAll();
    res.json(drugs);
});

module.exports = router;