const Sequelize = require('sequelize');
const { exec } = require("child_process");

const UserModel = require('./db/user.model');
const PersonModel = require('./db/person.model');
const VeterinaryModel = require('./db/veterinary.model');
const TutorModel = require('./db/tutor.model');
const VetOwnerModel = require('./db/vet_owner.model');
const PetModel = require('./db/pet.model');
const VetModel = require('./db/vet.model');
const RaceModel = require('./db/race.model');
const SpecieModel = require('./db/specie.model');
const PetAssociationModel = require('./db/pet_association.model');

const sequelize = new Sequelize('cuivet-api','root','rootpass',{
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Person = PersonModel(sequelize, Sequelize);
const Veterinary = VeterinaryModel(sequelize, Sequelize);
const Tutor = TutorModel(sequelize, Sequelize);
const VetOwner = VetOwnerModel(sequelize, Sequelize);
const Pet = PetModel(sequelize, Sequelize);
const Vet = VetModel(sequelize, Sequelize);
const Race = RaceModel(sequelize, Sequelize);
const Specie = SpecieModel(sequelize, Sequelize);
const PetAssociation = PetAssociationModel(sequelize, Sequelize);

// Relaciones entre entidades
Person.belongsTo(User);
Veterinary.belongsTo(User);
Tutor.belongsTo(User);
VetOwner.belongsTo(User);
Pet.belongsTo(Tutor);
Pet.belongsTo(Race);
Race.belongsTo(Specie);
Vet.belongsTo(VetOwner);
Vet.belongsTo(Veterinary);
PetAssociation.belongsTo(Pet);
PetAssociation.belongsTo(Veterinary);
PetAssociation.belongsTo(Vet);

sequelize.sync({ force: false})
    .then(() => {
        exec("npx sequelize-cli db:seed:all", (error, stdout, stderr) => {
            if (error) {
                console.log(`No se pudieron inicializar las semillas. Esto puede deberse a que la tabla ya estaba poblada. Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`Se inicializaron las semillas con stderr: ${stderr}`);
                return;
            }
            console.log(`Se inicializaron las semillas con stdout: ${stdout}`);
        });
        console.log('Tablas sincronizadas');
    });

module.exports = {
    User,
    Person,
    Veterinary,
    Tutor,
    VetOwner,
    Pet, 
    Race,
    Specie,
    Vet,
    PetAssociation
}