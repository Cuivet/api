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
const ClinicalRecordModel = require('./db/clinical_record.model');
const VisitModel = require('./db/visit.model');
const ReviewModel = require('./db/review.model');
const AnamnesisModel = require('./db/anamnesis.model');
const PhysicalExamModel = require('./db/physical_exam.model');
const PresumptiveDiagnosisModel = require('./db/presumptive_diagnosis.model');
const DiagnosisModel = require('./db/diagnosis.model');
const PrognosisModel = require('./db/prognosis.model');
const AnamnesisQuestionModel = require('./db/anamnesis_question.model');
const ComplementaryStudyTypeModel = require('./db/complementary_study_type.model');
const DiagnosisTypeModel = require('./db/diagnosis_type.model');
const TreatmentTypeModel = require('./db/treatment_type.model');
const TreatmentOptionModel = require('./db/treatment_option.model');
const DrugModel = require('./db/drug.model');
const AnamnesisItemModel = require('./db/anamnesis_item.model');
const PresumptiveDiagnosisItemModel = require('./db/presumptive_diagnosis_item.model');
const ComplementaryStudyModel = require('./db/complementary_study.model');
const DiagnosisItemModel = require('./db/diagnosis_item.model');
const DiagnosisItemTreatmentModel = require('./db/diagnosis_item_treatment.model');
const HairColorModel = require('./db/hair_color.model');
const HairLengthModel = require('./db/hair_length.model');
const PetSizeModel = require('./db/pet_size.model');
const VeterinaryAssociationModel = require('./db/veteriary_association.model');

const sequelize = new Sequelize('cuivet-api','root','rootpass',{
    host: 'localhost',
    dialect: 'mysql',
    query: {raw: true}
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
const ClinicalRecord = ClinicalRecordModel(sequelize, Sequelize);
const Visit = VisitModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);
const Anamnesis = AnamnesisModel(sequelize, Sequelize);
const PhysicalExam = PhysicalExamModel(sequelize, Sequelize);
const PresumptiveDiagnosis = PresumptiveDiagnosisModel(sequelize, Sequelize);
const Diagnosis = DiagnosisModel(sequelize, Sequelize);
const Prognosis = PrognosisModel(sequelize, Sequelize);
const AnamnesisQuestion = AnamnesisQuestionModel(sequelize, Sequelize);
const ComplementaryStudyType = ComplementaryStudyTypeModel(sequelize, Sequelize);
const DiagnosisType = DiagnosisTypeModel(sequelize, Sequelize);
const TreatmentType = TreatmentTypeModel(sequelize, Sequelize);
const TreatmentOption = TreatmentOptionModel(sequelize, Sequelize);
const Drug = DrugModel(sequelize, Sequelize);
const AnamnesisItem = AnamnesisItemModel(sequelize, Sequelize);
const PresumptiveDiagnosisItem = PresumptiveDiagnosisItemModel(sequelize, Sequelize);
const ComplementaryStudy = ComplementaryStudyModel(sequelize, Sequelize);
const DiagnosisItem = DiagnosisItemModel(sequelize, Sequelize);
const DiagnosisItemTreatment = DiagnosisItemTreatmentModel(sequelize, Sequelize);
const HairColor = HairColorModel(sequelize, Sequelize);
const HairLength = HairLengthModel(sequelize, Sequelize);
const PetSize = PetSizeModel(sequelize, Sequelize);
const VeterinaryAssociation = VeterinaryAssociationModel(sequelize, Sequelize);

// Relaciones entre entidades
Person.belongsTo(User);
Veterinary.belongsTo(User);
Tutor.belongsTo(User);
VetOwner.belongsTo(User);
Pet.belongsTo(Tutor);
Pet.belongsTo(Race);
Pet.belongsTo(HairColor);
Pet.belongsTo(HairLength);
Pet.belongsTo(PetSize);
Race.belongsTo(Specie);
Vet.belongsTo(VetOwner);
Vet.belongsTo(Veterinary);
PetAssociation.belongsTo(Pet);
PetAssociation.belongsTo(Veterinary);
PetAssociation.belongsTo(Vet);
ClinicalRecord.belongsTo(Pet);
ClinicalRecord.belongsTo(Vet);
ClinicalRecord.belongsTo(Veterinary);
Visit.belongsTo(ClinicalRecord);
Review.belongsTo(Visit);
Anamnesis.belongsTo(Visit);
PhysicalExam.belongsTo(Visit);
PresumptiveDiagnosis.belongsTo(Visit);
Diagnosis.belongsTo(Visit);
Prognosis.belongsTo(Visit);
AnamnesisItem.belongsTo(Anamnesis);
AnamnesisItem.belongsTo(AnamnesisQuestion);
PresumptiveDiagnosisItem.belongsTo(PresumptiveDiagnosis);
PresumptiveDiagnosisItem.belongsTo(DiagnosisType);
ComplementaryStudy.belongsTo(PresumptiveDiagnosis);
ComplementaryStudy.belongsTo(ComplementaryStudyType);
DiagnosisItem.belongsTo(DiagnosisType);
DiagnosisItem.belongsTo(Diagnosis);
DiagnosisItemTreatment.belongsTo(DiagnosisItem);
DiagnosisItemTreatment.belongsTo(TreatmentOption);
DiagnosisItemTreatment.belongsTo(Drug);
TreatmentOption.belongsTo(TreatmentType);
VeterinaryAssociation.belongsTo(Vet);
VeterinaryAssociation.belongsTo(Veterinary);

sequelize.sync({ force: false })
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
    PetAssociation,
    ClinicalRecord,
    Visit,
    Review,
    Anamnesis,
    PhysicalExam,
    PresumptiveDiagnosis,
    Diagnosis,
    Prognosis,
    AnamnesisQuestion,
    ComplementaryStudyType,
    DiagnosisType,
    TreatmentType,
    Drug,
    AnamnesisItem,
    PresumptiveDiagnosisItem,
    ComplementaryStudy,
    DiagnosisItem,
    DiagnosisItemTreatment,
    HairColor,
    HairLength,
    PetSize,
    TreatmentOption,
    VeterinaryAssociation
}