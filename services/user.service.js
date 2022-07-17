const bcrypt = require('bcryptjs');
const { User } = require('../models/db');
const moment = require('moment');
const jwt = require('jwt-simple');
const { check } = require('express-validator');

var userService = {
    registerUser: registerUser,
    loginUser: loginUser
}

async function registerUser(newUser){
    newUser.password = bcrypt.hashSync(newUser.password,10);
    const user = await User.create(newUser);
    return user;
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