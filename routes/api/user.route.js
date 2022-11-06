const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const userService = require('../../services/user.service');

var cors = require('cors');
router.use(cors());

router.post('/register',[   check('user.password','El password es obligatorio').not().isEmpty(),
                            check('user.email','El email es incorrecto').isEmail()
                        ], async (req, res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const errors = validationResult(req);
    if( !errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array()})
    }
    try {
        res.json(await userService.registerUser(req.body));
    } catch (e){
        res.status(500).send(e.message);
    }
});

router.post('/login', async (req, res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    res.json(await userService.loginUser(req.body));
});

router.get('/profile', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const profile = await userService.findProfile(req.headers.token);
    res.json(profile);
});

module.exports = router;