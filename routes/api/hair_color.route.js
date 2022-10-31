const router = require('express').Router();
const hairColorService = require('../../services/hair_color.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const hairColors = await hairColorService.findAll();
    res.json(hairColors);
});

module.exports = router;