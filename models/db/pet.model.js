module.exports = (sequelize, type) => {
    return sequelize.define('pet', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        birth: type.DATE,
        isMale: type.BOOLEAN,
        castrationDate: type.DATE, 
        haveChip: type.BOOLEAN, 
        aspects: type.STRING, 
    },{
        freezeTableName: true
    });
}
