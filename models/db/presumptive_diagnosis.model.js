module.exports = (sequelize, type) => {
    return sequelize.define('presumptive_diagnosis', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true}
    },{
        freezeTableName: true
    });
}
