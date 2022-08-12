module.exports = (sequelize, type) => {
    return sequelize.define('pet', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        date_birth: type.STRING,
        // especie, raza, size, sex
    },{
        freezeTableName: true //para que sequelize no le agregue una s al final del nombre.
    });
}
