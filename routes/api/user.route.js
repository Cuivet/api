const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const userService = require('../../services/user.service');

var cors = require('cors');
router.use(cors());

// decidimos mezclar el route(resources) con lo que en otros proyectos suele ser el controller para no tener tantos archivos (ya que no será un proyecto tan grande)

router.post('/register',[   check('password','El password es obligatorio').not().isEmpty(),
                            check('email','El email es incorrecto').isEmail()
                        ], async (req, res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const errors = validationResult(req);
    if( !errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array()})
    }
    const user = await userService.registerUser(req.body);
    res.json(user);
});

router.post('/login', async (req, res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    res.json(await userService.loginUser(req.body));
});

module.exports = router;