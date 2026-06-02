"use strict";
import { Sequelize, DataTypes, Model, Optional} from "sequelize";
import { IUser } from "../interfaces/user.interface";

interface UserCreationAttributes extends Optional<IUser, "user_id" | "credit_balance" | "is_premium" | "avatar_url" | "role" | "created_at" | "updated_at"> {}
export default (sequelize: Sequelize) => {
  class User extends Model<IUser, UserCreationAttributes> {
    public user_id!: number;
    public username!: string;
    public email!: string;
    public password_hash!: string;
    public credit_balance!: number;
    public is_premium!: boolean;
    public avatar_url!: string | null;
    public role!: "user" | "admin";
    public created_at!: Date;
    public updated_at!: Date;

    static associate(models: any) {
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
      username: { 
        type: DataTypes.STRING(50),
        allowNull: false, 
        unique: true ,
        validate: {
          len: [3, 50], 
        },
      },
      email: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password_hash: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      credit_balance: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0,
        allowNull: false,
      }, 
      is_premium: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
        allowNull: false,
      },
      avatar_url: { 
        type: DataTypes.STRING(255),
        allowNull: true
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },  
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return User;
};
