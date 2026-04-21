"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Documents", {
      doc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uploader_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "user_id" },
        onDelete: "SET NULL",
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: "Categories", key: "category_id" },
        onDelete: "SET NULL",
      },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT },
      file_url: { type: Sequelize.STRING(255), allowNull: false },
      thumbnail_url: { type: Sequelize.STRING(255) },
      file_type: {
        type: Sequelize.ENUM("pdf", "epub", "docx", "pptx"),
        allowNull: false,
      },
      price_credits: { type: Sequelize.INTEGER, defaultValue: 0 },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
      view_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      download_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Documents");
  },
};
