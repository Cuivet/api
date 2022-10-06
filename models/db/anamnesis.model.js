module.exports = (sequelize, type) => {
    return sequelize.define('anamnesis', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}
    },{
        freezeTableName: true
    });
}
