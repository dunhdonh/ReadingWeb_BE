"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Annotations", {
      annotation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "user_id" },
        onDelete: "CASCADE",
      },
      doc_id: {
        type: Sequelize.INTEGER,
        references: { model: "Documents", key: "doc_id" },
        onDelete: "CASCADE",
      },
      page_number: { type: Sequelize.INTEGER },
      content: { type: Sequelize.TEXT },
      color_code: { type: Sequelize.STRING(10) },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Annotations");
  },
};
