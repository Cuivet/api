module.exports = (sequelize, type) => {
    return sequelize.define('vet', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        phone: type.STRING,
        address: type.STRING,
        photo: type.STRING,
        lat: { type: type.FLOAT },
        lng: { type: type.FLOAT } 
    },{
        freezeTableName: true
    });
}