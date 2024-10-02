module.exports = (sequelize, type) => {
    return sequelize.define('complementary_study', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}, //en un principio usamos el id para que sea mas easy
        url: type.STRING,
        observation: type.STRING
    },{
        freezeTableName: true
    });
}
