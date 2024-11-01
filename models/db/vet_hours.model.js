module.exports = (sequelize, type) => {
  return sequelize.define(
    "vet_hours",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      dayOfWeek: type.STRING,
      openTime: type.TIME,
      closeTime: type.TIME,
    },
    {
      freezeTableName: true,
    }
  );
};
