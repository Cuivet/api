const bcrypt = require('bcryptjs');
const { User } = require('../models/db');
const moment = require('moment');
const jwt = require('jwt-simple');
const personService = require('../services/person.service');

var userService = {
    registerUser: registerUser,
    loginUser: loginUser
}

async function registerUser(newProfile){
    newProfile.user.password = bcrypt.hashSync(newProfile.user.password,10);
    try {
        const user = await User.create(newProfile.user);
        newProfile.person.userId = user.id;
        const person = await personService.save(newProfile.person);
    } catch{
        return 'ERROR'; // ver despues de devolver un HTTP error y NO un json que con http OK
    }
    return newProfile;
}

async function loginUser(user){
    const bdUser = await User.findOne({ where: { email: user.email }});
    if(bdUser){
        const isSamePassword = bcrypt.compareSync(user.password, bdUser.password);
        if(isSamePassword){
            return { success: createToken(bdUser) };
        } else{
            return { error: 'Error en usuario y/o contraseña' };
        }
    } else{
        return { error: 'Error en usuario y/o contraseña' };
    }
}

const createToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5,'minutes').unix()
    }
    return jwt.encode(payload, 'frase secreta');
}

module.exports = userService;