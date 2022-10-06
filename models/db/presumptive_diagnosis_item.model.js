module.exports = (sequelize, type) => {
    return sequelize.define('presumptive_diagnosis_item', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        observation: type.STRING
    },{
        freezeTableName: true
    });
}
