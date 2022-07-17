const Sequelize = require('sequelize'); // esta es la libreria sequelize

const PetModel = require('./models/pet.model');
const UserModel = require('./models/user.model');
const PersonModel = require('./models/person.model');

const sequelize = new Sequelize('cuivet-api','root','rootpass',{
    host: 'localhost',
    dialect: 'mysql'
}); //este seria el objeto sequelize

const Pet = PetModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Person = PersonModel(sequelize, Sequelize);

// Relaciones entre entidades
Person.belongsTo(User);

sequelize.sync({ force: false})
    .then(() => {
        console.log('Tablas sincronizadas');
    });

module.exports = {
    Pet,
    User,
    Person
}