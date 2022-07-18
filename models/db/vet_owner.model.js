module.exports = (sequelize, type) => {
    return sequelize.define('vet_owner', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}
    },{
        freezeTableName: true
    });
}