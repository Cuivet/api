module.exports = (sequelize, type) => {
    return sequelize.define('tutor', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}
    },{
        freezeTableName: true
    });
}