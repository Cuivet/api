const router = require('express').Router();
const treatmentOptionService = require('../../services/treatment_option.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const treatmentOptions = await treatmentOptionService.findAll();
    res.json(treatmentOptions);
});

module.exports = router;