const router = require('express').Router();
const anamnesisQuestionService = require('../../services/anamnesis_question.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const anamnesisQuestions = await anamnesisQuestionService.findAll();
    res.json(anamnesisQuestions);
});

module.exports = router;