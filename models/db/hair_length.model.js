module.exports = (sequelize, type) => {
    return sequelize.define('hair_length', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING, 
        description: type.STRING,

    },{
        freezeTableName: true
    });
}
