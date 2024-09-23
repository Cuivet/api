const router = require('express').Router();
const drugTypeService = require('../../services/drug_type.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const drugTypes = await drugTypeService.findAll();
    res.json(drugTypes);
});

module.exports = router;