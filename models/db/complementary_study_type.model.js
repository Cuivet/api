module.exports = (sequelize, type) => {
    return sequelize.define('complementary_study_type', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}, //en un principio usamos el id para que sea mas easy
        name: type.STRING
    },{
        freezeTableName: true
    });
}
