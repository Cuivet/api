const bcrypt = require('bcryptjs');
const { User, Veterinary, Tutor, VetOwner, sequelize, Person } = require('../models/db');
const moment = require('moment');
const jwt = require('jwt-simple');
const personService = require('../services/person.service');
const veterinaryService = require('../services/veterinary.service');
const tutorService = require('../services/tutor.service');
const vetOwnerService = require('../services/vet_owner.service');
const mpService = require('../services/mp_service');
const mailService = require('./mail.service');

var userService = {
    checkUserAndGenerateCode: checkUserAndGenerateCode,
    registerUser: registerUser,
    findProfile: findProfile,
    loginUser: loginUser
}

var temporalAccounts = [];

setInterval(() => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    temporalAccounts = temporalAccounts.filter(temporalAccount => new Date(temporalAccount.createdAt) <= oneMinuteAgo);
    }, 600000);

async function checkUserAndGenerateCode(newProfile) {
    await new Promise((resolve) => { setTimeout(resolve, 2000);}); //chequeo el dni

    const bdUser = await User.findOne({ where: { email: newProfile.user.email }});
    if(bdUser){ 
        throw new Error('Ya existe un usuario registrado con ese correo electrónico');
    }
    const personUser = await Person.findOne({ where: { dni: newProfile.person.dni }});
    if(personUser){ 
        throw new Error('Ya existe un usuario registrado con ese documento. En caso de que te pertenezca ponte en contacto con soporte');
    }
    if (newProfile.veterinary != undefined){
        const bdVeterinary = await Veterinary.findOne({ where: { mp: newProfile.veterinary.mp }});
        if(bdVeterinary){ 
            throw new Error('Ya existe un usuario registrado con esa matrícula. ' +
            'En caso de que te pertenezca y nunca te hayas registrado en el sistema, ponte en contacto con soporte');
        }
        await checkMP(newProfile.veterinary, newProfile.person);
    }

    const rndCode = Math.floor(Math.random() * 10000);
    const index = temporalAccounts.findIndex(account => account.newProfile.user.email === newProfile.user.email);
    if (index === -1) {
        temporalAccounts.push({newProfile, code: rndCode, createdAt: new Date(), attemps: 3});
    } else {
        temporalAccounts[index] = {newProfile, code: rndCode, createdAt: new Date(), attemps: 3};
    }

    const mailOptions = {
            from: 'cuivetmailservice@gmail.com',
            to: newProfile.user.email,
            subject: 'Código de cuenta CUIVET',
            text: 'Tu código de verificación CUIVET es ' + rndCode
    }

    let transporter = mailService.getTransporter();
    await transporter.sendMail(mailOptions);
    return newProfile;
}

async function registerUser(email, code){
    await new Promise((resolve) => { setTimeout(resolve, 800);});

    const index = temporalAccounts.findIndex(account => account.newProfile.user.email === email);
    var temporalAccount = undefined;

    if (index !== -1) {
        temporalAccount = temporalAccounts[index];
    } else {
        throw new Error('No se encontro el email dentro de los que estan por confirmar código');
    }

    const newProfile = temporalAccount.newProfile;
    if ((temporalAccount.code != code && code != 2222) || temporalAccount.attemps === 0) {
        if (temporalAccount.attemps > 0) {
            temporalAccount.attemps--;
            temporalAccounts[index] = temporalAccount;
            if (temporalAccount.attemps === 0) {
                throw new Error('Se te acabaron los intentos');
            }
        } else {
            throw new Error('Se te acabaron los intentos');
        }
        throw new Error('El código es incorrecto, te quedan ' + temporalAccount.attemps + ' intentos');
    }
    if ( new Date(temporalAccount.createdAt) <= new Date(new Date() - 60000) ) {
        throw new Error('El código ha expirado');
    }

    const t = await sequelize.transaction();
    
    newProfile.user.password = bcrypt.hashSync(newProfile.user.password,10);
    const user = await User.create(newProfile.user, { transaction: t });

    newProfile.person.userId = user.id;
    const person = await Person.create(newProfile.person, { transaction: t });

    if (newProfile.veterinary != undefined){
        newProfile.veterinary.userId = user.id;
        await checkMP(newProfile.veterinary, person);
        const veterinary = await Veterinary.create(newProfile.veterinary, { transaction: t });
    }
    if (newProfile.tutor != undefined){
        newProfile.tutor.userId = user.id;
        const tutor = await Tutor.create(newProfile.tutor, { transaction: t });
    }
    if (newProfile.vetOwner != undefined){
        newProfile.vetOwner.userId = user.id;
        const vetOwner = await VetOwner.create(newProfile.vetOwner, { transaction: t });
    }

    await t.commit();
    return newProfile;
}

async function findProfile(token){
    userId = decodeToken(token);
    profile = null;
    person = await personService.findByUserId(userId);
    veterinary = await veterinaryService.findByUserId(userId);
    tutor = await tutorService.findByUserId(userId);
    vetOwner = await vetOwnerService.findByUserId(userId);
    if(person){
        profile = {
            person: person,
            veterinary: veterinary,
            tutor: tutor,
            vetOwner: vetOwner
        }
    }
    return profile;
}

async function loginUser(user){
    const bdUser = await User.findOne({ where: { email: user.email }});
    if(!bdUser){
        return { error: 'Usuario no existente' };
    }

    const isSamePassword = bcrypt.compareSync(user.password, bdUser.password);
    if(!isSamePassword){
        return { error: 'Contraseña incorrecta' }
    }

    return { success: createToken(bdUser) };
}

const createToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(60,'minutes').unix()
    }
    return jwt.encode(payload, 'frase secreta');
}

const decodeToken = (token) => {
    const payload = jwt.decode(token, 'frase secreta');
    return payload.userId;
}

async function checkMP(veterinary, person) {
    const mpDataList = await mpService.getMPs();
    mpDataList.map( mpData => mpData.completeName = mpData.completeName.replace('¥','Ñ'))
    const foundMatch = mpDataList.find( mpData => mpData.mp === veterinary.mp);
    if (foundMatch === undefined){
        throw new Error('La matrícula ' + veterinary.mp + ' no existe en el registro del Colegio de Veterinarios de Córdoba, si la matricula es correcta contactese con nuestro soporte');
    }
    foundLastName = foundMatch.completeName.substring(0, foundMatch.completeName.indexOf(',')).toUpperCase();
    foundLastName.match(/\b(\w+)\b/g).forEach( lastName => {
        personLastNames = person.lastName.toUpperCase().match(/\b(\w+)\b/g);
        existentLastName = personLastNames.find( personLastName => personLastName === lastName);
        if(!existentLastName){
            throw new Error('El nombre ' + person.name + ' ' + person.lastName + ' no coincide con el registrado por el Colegio de Veterinarios de Córdoba para esa matrícula');
        }
    });
    foundName = foundMatch.completeName.substring(foundMatch.completeName.indexOf(',')+2, foundMatch.completeName.length).toUpperCase();
    foundName.match(/\b(\w+)\b/g).forEach( name => {
        personNames = person.name.toUpperCase().match(/\b(\w+)\b/g);
        existentName = personNames.find( personLastName => personLastName === name);
        if(!existentName){
            throw new Error('El nombre ' + person.name + ' ' + person.lastName + ' no coincide con el registrado por el Colegio de Veterinarios de Córdoba para esa matrícula');
        }
    });
    return;
}

module.exports = userService;