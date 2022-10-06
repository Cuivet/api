module.exports = (sequelize, type) => {
    return sequelize.define('prognosis', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        observation: type.STRING
    },{
        freezeTableName: true
    });
}
