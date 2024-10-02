module.exports = (sequelize, type) => {
    return sequelize.define('vaccination', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        placementDate: type.DATE,
        nextDate: type.DATE,
        weight: type.DOUBLE,
        observation: type.STRING,
        signed: type.BOOLEAN
    }, {
        freezeTableName: true
    });
}