const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    if(!req.headers['token']) {
        return res.json({ error: 'Necesitas incluir el token en la cabecera'});
    }

    const userToken = req.headers['token'];

    let payload = {};

    try{
        payload = jwt.decode(userToken, 'frase secreta');
    } catch (e){
        return res.json({ error: 'El token es incorrecto'});
    }
    
    if(payload.expiredAt < moment().unix()){
        return res.json({ error: 'El token ha expirado'});
    }

    req.usuarioId = payload.usuarioId; 
    next();
}

module.exports = {
    checkToken
}