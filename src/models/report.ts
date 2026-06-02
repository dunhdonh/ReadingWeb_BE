"use strict";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { IReport } from "../interfaces/report.interface";

interface ReportCreationAttributes extends Optional<IReport, "report_id" | "created_at" | "updated_at"> {}

export default (sequelize: Sequelize) => {
  class Report extends Model <IReport, ReportCreationAttributes> {
    public report_id!: number;
    public reporter_id!: number;
    public doc_id!: number;
    public reason!: string;
    public status!: "pending" | "reviewed" | "resolved";
    public created_at!: Date;
    public updated_at!: Date;
  
    static associate(models: any) {
      this.belongsTo(models.User, {
        foreignKey: "reporter_id",
        as: "reporter",
      });
      this.belongsTo(models.Document, { foreignKey: "doc_id" });
    }
  }
  Report.init(
    {
      report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reporter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "reviewed", "resolved"),
        defaultValue: "pending",
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
      modelName: "Report",
      tableName: "Reports",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Report;
};
