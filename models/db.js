const Sequelize = require('sequelize'); // esta es la libreria sequelize

const UserModel = require('./db/user.model');
const PersonModel = require('./db/person.model');

const sequelize = new Sequelize('cuivet-api','root','rootpass',{
    host: 'localhost',
    dialect: 'mysql'
}); //este seria el objeto sequelize

const User = UserModel(sequelize, Sequelize);
const Person = PersonModel(sequelize, Sequelize);

// Relaciones entre entidades
Person.belongsTo(User);

sequelize.sync({ force: false})
    .then(() => {
        console.log('Tablas sincronizadas');
    });

module.exports = {
    User,
    Person
}