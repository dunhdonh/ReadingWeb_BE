"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Unlocks",
      {
        unlock_id: {
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
        unlocked_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        uniqueKeys: { unique_unlock: { fields: ["user_id", "doc_id"] } },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Unlocks");
  },
};
