module.exports = (sequelize, type) => {
    return sequelize.define('diagnosis_type', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING
    },{
        freezeTableName: true
    });
}
