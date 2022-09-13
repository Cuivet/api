module.exports = (sequelize, type) => {
    return sequelize.define('specie', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
    },{
        freezeTableName: true
    });
}