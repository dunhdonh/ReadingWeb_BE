"use strict";
import { Sequelize, DataTypes, Model } from "sequelize";
import { IReadingProgress } from "../interfaces/readingprogress.interface";

export default (sequelize: Sequelize) => {
  class ReadingProgress extends Model<IReadingProgress> implements IReadingProgress {
    public progress_id!: number;
    public user_id!: number;
    public doc_id!: number;
    public last_page!: number;
    public total_pages!: number;
    public created_at!: Date;
    public updated_at!: Date;

    static associate(models: any) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(models.Document, { foreignKey: "doc_id" });
    }
  }
  ReadingProgress.init(
    {
      progress_id: {
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
      last_page: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "ReadingProgress",
      tableName: "ReadingProgress",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return ReadingProgress;
};
