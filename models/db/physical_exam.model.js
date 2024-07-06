const { body } = require("express-validator");

module.exports = (sequelize, type) => {
    return sequelize.define('physical_exam', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        temperature: type.DOUBLE,
        weight: type.DOUBLE,
        pulse: type.DOUBLE,
        mucousMembrane: type.STRING,
        bodyCondition: type.INTEGER,
        observation: type.STRING
    },{
        freezeTableName: true
    });
}
