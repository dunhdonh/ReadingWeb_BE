"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReadingProgresses", {
      progress_id: {
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
      last_page: { type: Sequelize.INTEGER, defaultValue: 1 },
      total_pages: { type: Sequelize.INTEGER },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ReadingProgresses");
  },
};
