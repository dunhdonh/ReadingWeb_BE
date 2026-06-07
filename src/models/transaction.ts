"use strict";
import { Sequelize, DataTypes, Model } from "sequelize";
import { ITransaction } from "../interfaces/transaction.interface";

export default (sequelize: Sequelize) => {
  class Transaction extends Model<ITransaction> implements ITransaction {
    public transaction_id!: number;
    public user_id!: number;
    public amount!: number;
    public transaction_date!: Date;
    public description?: string;
    public created_at!: Date;
    public updated_at!: Date;

    static associate(models: any) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  Transaction.init(
    {
      transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },  
      type: {
        type: DataTypes.ENUM("upload_reward", "purchase", "top-up", "refund"),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
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
      modelName: "Transaction",
      tableName: "Transactions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Transaction;
};
