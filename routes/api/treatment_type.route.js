const router = require('express').Router();
const treatmentTypeService = require('../../services/treatment_type.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const treatmentTypes = await treatmentTypeService.findAll();
    res.json(treatmentTypes);
});

module.exports = router;