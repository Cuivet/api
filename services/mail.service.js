const nodemailer = require('nodemailer');

var mailService = {
    getTransporter: getTransporter
}

function getTransporter(){
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'cuivetmailservice@gmail.com',
            pass: 'qpxclmcfnuqhpniv' // rootpass
        }
    });
}

module.exports = mailService;