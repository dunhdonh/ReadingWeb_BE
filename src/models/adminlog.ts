"use strict";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { IAdminLog } from "../interfaces/adminlog.interface";

interface AdminLogAttributes extends IAdminLog {}
interface AdminLogCreationAttributes extends Optional<IAdminLog, "log_id" | "created_at" | "updated_at"> {}

export default (sequelize: Sequelize) => {
  class AdminLog extends Model<AdminLogAttributes, AdminLogCreationAttributes> {
    public log_id!: number;
    public admin_id!: number | null;
    public action!: string | null;
    public target_id!: number | null;
    public created_at!: Date;

    static associate(models: any) {
      this.belongsTo(models.User, { foreignKey: "admin_id", as: "admin" });
    }
  }

  AdminLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Users", key: "user_id" },
        onDelete: "SET NULL",
      },
      action: { type: DataTypes.STRING(255), allowNull: true },
      target_id: { type: DataTypes.INTEGER, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: "AdminLog",
      tableName: "AdminLogs",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return AdminLog;
};
