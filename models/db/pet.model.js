module.exports = (sequelize, type) => {
    return sequelize.define('pet', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        birth: type.DATE,
        // especie, raza, size, sex
    },{
        freezeTableName: true //para que sequelize no le agregue una s al final del nombre.
    });
}