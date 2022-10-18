module.exports = (sequelize, type) => {
    return sequelize.define('hair_color', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING
    },{
        freezeTableName: true
    });
}
