const Sequelize = require('sequelize'); // esta es la libreria sequelize

const PetModel = require('./models/pet');
const UserModel = require('./models/user');

const sequelize = new Sequelize('cuivet-api','root','rootpass',{
    host: 'localhost',
    dialect: 'mysql'
}); //este seria el objeto sequelize

const Pet = PetModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false})
    .then(() => {
        console.log('Tablas sincronizadas');
    });

module.exports = {
    Pet,
    User
}