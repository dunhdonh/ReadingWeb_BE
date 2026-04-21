"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      review_id: {
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
      rating: { type: Sequelize.TINYINT, validate: { min: 1, max: 5 } },
      comment: { type: Sequelize.TEXT },
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
    await queryInterface.dropTable("Reviews");
  },
};
