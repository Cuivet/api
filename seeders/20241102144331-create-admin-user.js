const bcrypt = require("bcryptjs");
const { User, Person } = require("../models/db"); // Asegúrate de importar los modelos correctos

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();

    try {
      const password = bcrypt.hashSync("admin@admin.com", 10); // Cambia 'admin_password' a la contraseña que prefieras

      // Crear el usuario administrador
      const adminUser = await User.create(
        {
          id: 1,
          email: "admin@admin.com",
          password: password,
          active: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction: t }
      );

      // Crear la persona asociada al usuario administrador
      await Person.create(
        {
          id: 1,
          name: "Administrador",
          lastName: "User",
          dni: "12345678",
          userId: adminUser.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction: t }
      );

      await t.commit();
      console.log("Admin user and associated person created successfully");
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", { email: "admin@admin.com" }, {});
    console.log("Admin user deleted");
  },
};
