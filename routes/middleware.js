const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    if(!req.headers['user-token']) {
        return res.json({ error: 'Necesitas incluir el user-token en la cabecera'});
    }

    const userToken = req.headers['user-token'];

    let payload = {};

    try{
        payload = jwt.decode(userToken, 'frase secreta');
    } catch (e){
        return res.json({ error: 'El user-token es incorrecto'});
    }
    
    if(payload.expiredAt < moment().unix()){
        return res.json({ error: 'El user-token ha expirado'});
    }

    req.usuarioId = payload.usuarioId; 
    //para que en el middleware quede el ID del usuario que hace la consulta
    //es importante para temas de seguridad despues. cuando llega una consulta puedo
    //ver que el token sea el correspondiente a quien consulta con req.usuarioId

    next();
}

module.exports = {
    checkToken
}