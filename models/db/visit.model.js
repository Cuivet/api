module.exports = (sequelize, type) => {
    return sequelize.define('visit', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        control: type.STRING
    },{
        freezeTableName: true
    });
}
