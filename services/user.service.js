const bcrypt = require('bcryptjs');
const { User } = require('../models/db');
const moment = require('moment');
const jwt = require('jwt-simple');
const personService = require('../services/person.service');
const veterinaryService = require('../services/veterinary.service');
const tutorService = require('../services/tutor.service');
const vetOwnerService = require('../services/vet_owner.service');

var userService = {
    registerUser: registerUser,
    findProfile: findProfile,
    loginUser: loginUser
}

async function registerUser(newProfile){
    newProfile.user.password = bcrypt.hashSync(newProfile.user.password,10);
    try {
        const user =    await User.create(newProfile.user);
        newProfile.person.userId = user.id;
        const person = await personService.save(newProfile.person);
        if (newProfile.veterinary != undefined){
            newProfile.veterinary.userId = user.id;
            const veterinary = await veterinaryService.save(newProfile.veterinary);
        }
        if (newProfile.tutor != undefined){
            newProfile.tutor.userId = user.id;
            const tutor = await tutorService.save(newProfile.tutor);
        }
        if (newProfile.vetOwner != undefined){
            newProfile.vetOwner.userId = user.id;
            const vetOwner = await vetOwnerService.save(newProfile.vetOwner);
        }
    } catch (e) {
        return e; // ver despues de devolver un HTTP error y NO un json que con http OK
    }
    return newProfile;
}

async function findProfile(token){
    userId = decodeToken(token);
    prifle = null;
    person = await personService.findByUserId(userId);
    await veterinaryService.findByUserId(userId).then(res => {
        if(res[0] != undefined){
            profile = {person:person,veterinary:res[0]}
        }
      });
    await tutorService.findByUserId(userId).then(res => {
        if(res[0] != undefined){
            profile = {person:person,veterinary:res[0]}
        }
      });;
    await vetOwnerService.findByUserId(userId).then(res => {
        if(res[0] != undefined){
            profile= {person:person,veterinary:res[0]}
        }
      });;
    return profile;
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

const decodeToken = (token) => {
    const payload = jwt.decode(token, 'frase secreta');
    return payload.userId;
}

module.exports = userService;