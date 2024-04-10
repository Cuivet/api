module.exports = (sequelize, type) => {
    return sequelize.define('qualification', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        qualification: type.INTEGER,
        observation_qa: type.STRING
    },{
        freezeTableName: true
    });
}
