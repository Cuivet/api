module.exports = (sequelize, type) => {
    return sequelize.define('anamnesis_question', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        question: type.STRING,
        isBooleanResponse: type.BOOLEAN,
        isTextResponse: type.BOOLEAN,
    },{
        freezeTableName: true
    });
}
