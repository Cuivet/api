module.exports = (sequelize, type) => {
    return sequelize.define('diagnosis_item', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        observation: type.STRING,
        diagnosisResult: type.STRING
    },{
        freezeTableName: true
    });
}
