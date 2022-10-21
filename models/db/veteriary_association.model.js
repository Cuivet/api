module.exports = (sequelize, type) => {
    return sequelize.define('veterinary_association', {
    },{
        freezeTableName: true
    });
}