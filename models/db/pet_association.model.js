module.exports = (sequelize, type) => {
    return sequelize.define('pet_association', {
    },{
        freezeTableName: true
    });
}