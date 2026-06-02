"use strict";
import { Sequelize, DataTypes, Model } from "sequelize";
import { IWishlist } from "../interfaces/wishlist.interface";
  
export default (sequelize: Sequelize) => {
  class Wishlist extends Model<IWishlist> implements IWishlist {
    public wishlist_id!: number;
    public user_id!: number;
    public doc_id!: number;
    public added_at!: Date;

    static associate(models : any) {
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
      wishlist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      doc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
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
      tableName: "Wishlists",
      timestamps: false,
    },
  );
  return Wishlist;
};
