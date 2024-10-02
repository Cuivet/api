module.exports = (sequelize, type) => {
    return sequelize.define('review', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        birth: type.DATE,
        isMale: type.BOOLEAN,
        raceId: type.INTEGER,
        specieId: type.INTEGER,
    },{
        freezeTableName: true
    });
}
