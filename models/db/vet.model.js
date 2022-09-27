module.exports = (sequelize, type) => {
    return sequelize.define('vet', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        phone: type.STRING,
        address: type.STRING,
        photo: type.STRING,
    },{
        freezeTableName: true
    });
}