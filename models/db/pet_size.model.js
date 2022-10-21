module.exports = (sequelize, type) => {
    return sequelize.define('pet_size', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING
    },{
        freezeTableName: true
    });
}
