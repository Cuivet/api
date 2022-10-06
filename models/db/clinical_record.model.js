module.exports = (sequelize, type) => {
    return sequelize.define('clinical_record', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}
    },{
        initialAutoIncrement: 10000, freezeTableName: true
    });
}
