"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wishlists", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Users", key: "user_id" },
        onDelete: "CASCADE",
      },
      doc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Documents", key: "doc_id" },
        onDelete: "CASCADE",
      },
      added_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Wishlists");
  },
};
