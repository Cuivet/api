module.exports = (sequelize, type) => {
    return sequelize.define('anamnesis_item', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        booleanResponse: type.BOOLEAN,
        textResponse: type.STRING
    },{
        freezeTableName: true
    });
}
