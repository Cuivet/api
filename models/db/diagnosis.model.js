module.exports = (sequelize, type) => {
    return sequelize.define('diagnosis', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}
    },{
        freezeTableName: true
    });
}
