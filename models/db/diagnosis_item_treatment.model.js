module.exports = (sequelize, type) => {
    return sequelize.define('diagnosis_item_treatment', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        observation: type.STRING,
        frecuencyInterval: type.INTEGER, // hours
        frecuencyDuration: type.INTEGER // days
    },{
        freezeTableName: true
    });
}
