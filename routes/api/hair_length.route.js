const router = require('express').Router();
const hairLengthService = require('../../services/hair_length.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const hairLengths = await hairLengthService.findAll();
    res.json(hairLengths);
});

module.exports = router;