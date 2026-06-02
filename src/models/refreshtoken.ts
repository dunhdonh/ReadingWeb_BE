"use strict";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { IRefreshToken } from "../interfaces/refreshtoken.interface";

interface RefreshTokenCreationAttributes extends Optional<IRefreshToken, "refresh_token_id" | "createdAt" | "updatedAt"> {}

export default (sequelize: Sequelize) => {
  class RefreshToken extends Model<IRefreshToken, RefreshTokenCreationAttributes> implements IRefreshToken {
    public refresh_token_id!: number;
    public token!: string;
    public userId!: number;
    public expiredAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  RefreshToken.init(
    {
      refresh_token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", 
          key: "user_id", 
        },
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "RefreshTokens",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  return RefreshToken;
};