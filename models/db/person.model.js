module.exports = (sequelize, type) => {
    return sequelize.define('person', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        lastName: type.STRING,
        phone: type.STRING,
        address: type.STRING,
        dni: type.INTEGER,
        photo: type.STRING
    },{
        freezeTableName: true
    });
}