const router = require('express').Router();
const petSizeService = require('../../services/pet_size.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const petSizes = await petSizeService.findAll();
    res.json(petSizes);
});

module.exports = router;