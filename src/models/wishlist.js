"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "uploader_id",
        as: "uploader",
      });
      this.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      this.hasMany(models.DocumentTag, { foreignKey: "doc_id", as: "tags" });
      this.hasMany(models.Unlock, { foreignKey: "doc_id" });
      this.hasMany(models.ReadingProgress, { foreignKey: "doc_id" });
      this.hasMany(models.Annotation, { foreignKey: "doc_id" });
      this.hasMany(models.Review, { foreignKey: "doc_id", as: "reviews" });
      this.hasMany(models.Report, { foreignKey: "doc_id" });

      // Quan hệ nhiều-nhiều cho Wishlist
      this.belongsToMany(models.User, {
        through: "Wishlists",
        foreignKey: "doc_id",
        otherKey: "user_id",
        as: "wishedByUsers",
      });
    }
  }
  Wishlist.init(
    {
      doc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      added_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      sequelize,
      modelName: "Wishlist",
    },
  );
  return Wishlist;
};
