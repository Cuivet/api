module.exports = (sequelize, type) => {
    return sequelize.define('physical_exam', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        temperature: type.DOUBLE,
        observation: type.STRING
    },{
        freezeTableName: true
    });
}
