module.exports = (sequelize, type) => {
    return sequelize.define('pet', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        birth: type.DATE,
        imageCode: type.STRING
    },{
        freezeTableName: true //para que sequelize no le agregue una s al final del nombre.
    });
}
