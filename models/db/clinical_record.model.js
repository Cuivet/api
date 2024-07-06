module.exports = (sequelize, type) => {
    return sequelize.define('clinical_record', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        reasonConsultation: type.STRING,
    },{
        initialAutoIncrement: 10000, freezeTableName: true
    });
}
