"use strict";
import { Sequelize, DataTypes, Model } from "sequelize";
import { IUnlock } from "../interfaces/unlock.interface";

export default (sequelize : Sequelize) => {
  class Unlock extends Model<IUnlock> implements IUnlock {
    public unlock_id!: number;
    public user_id!: number;
    public doc_id!: number;
    public unlock_date!: Date;
    public created_at!: Date;
    public updated_at!: Date;
    
    static associate(models: any) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(models.Document, { foreignKey: "doc_id" });
    }
  }
  Unlock.init(
    {
      unlock_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unlock_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
      modelName: "Unlock",
      tableName: "Unlocks",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Unlock;
};
