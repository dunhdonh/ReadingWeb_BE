"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Document, {
        foreignKey: "uploader_id",
        as: "uploadedDocuments",
      });
      this.hasMany(models.Transaction, { foreignKey: "user_id" });
      this.hasMany(models.Unlock, { foreignKey: "user_id" });
      this.hasMany(models.ReadingProgress, { foreignKey: "user_id" });
      this.hasMany(models.Annotation, { foreignKey: "user_id" });
      this.hasMany(models.Review, { foreignKey: "user_id" });
      this.hasMany(models.Report, { foreignKey: "reporter_id" });
      this.hasMany(models.AdminLog, { foreignKey: "admin_id" });

      // Quan hệ nhiều-nhiều cho Wishlist
      this.belongsToMany(models.Document, {
        through: "Wishlists",
        foreignKey: "user_id",
        otherKey: "doc_id",
        as: "wishlistItems",
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      credit_balance: { type: DataTypes.INTEGER, defaultValue: 0 }, 
      is_premium: { type: DataTypes.BOOLEAN, defaultValue: false },
      avatar_url: { type: DataTypes.STRING(255) },
      role: {
        type: DataTypes.ENUM("reader", "uploader", "admin"),
        defaultValue: "reader",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },  
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
