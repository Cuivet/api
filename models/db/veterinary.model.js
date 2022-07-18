module.exports = (sequelize, type) => {
    return sequelize.define('veterinary', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}
    },{
        freezeTableName: true
    });
}