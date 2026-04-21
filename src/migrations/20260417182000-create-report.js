"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reports", {
      report_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reporter_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "user_id" },
        onDelete: "SET NULL",
      },
      doc_id: {
        type: Sequelize.INTEGER,
        references: { model: "Documents", key: "doc_id" },
        onDelete: "CASCADE",
      },
      reason: { type: Sequelize.STRING(255) },
      status: {
        type: Sequelize.ENUM("pending", "resolved", "dismissed"),
        defaultValue: "pending",
      },
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
    await queryInterface.dropTable("Reports");
  },
};
