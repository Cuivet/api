const Sequelize = require('sequelize'); // esta es la libreria sequelize

const UserModel = require('./db/user.model');
const PersonModel = require('./db/person.model');
const VeterinaryModel = require('./db/veterinary.model');
const TutorModel = require('./db/tutor.model');
const VetOwnerModel = require('./db/vet_owner.model');
const PetModel = require('./db/pet.model');
const VetModel = require('./db/vet.model')

const sequelize = new Sequelize('cuivet-api','root','rootpass',{
    host: 'localhost',
    dialect: 'mysql'
}); //este seria el objeto sequelize

const User = UserModel(sequelize, Sequelize);
const Person = PersonModel(sequelize, Sequelize);
const Veterinary = VeterinaryModel(sequelize, Sequelize);
const Tutor = TutorModel(sequelize, Sequelize);
const VetOwner = VetOwnerModel(sequelize, Sequelize);
const Pet = PetModel(sequelize, Sequelize);
const Vet = VetModel(sequelize, Sequelize);

// Relaciones entre entidades
Person.belongsTo(User);
Veterinary.belongsTo(User);
Tutor.belongsTo(User);
VetOwner.belongsTo(User);
Pet.belongsTo(Tutor);
Vet.belongsTo(VetOwner);

sequelize.sync({ force: false})
    .then(() => {
        console.log('Tablas sincronizadas');
    });

module.exports = {
    User,
    Person,
    Veterinary,
    Tutor,
    VetOwner,
    Pet,
    Vet
}