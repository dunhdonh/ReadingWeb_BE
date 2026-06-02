"use strict";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { IReview } from "../interfaces/review.interface";

interface ReviewCreationAttributes extends Optional<IReview, "review_id" | "created_at" | "updated_at"> {}

module.exports = (sequelize: Sequelize) => {
  class Review extends Model<IReview, ReviewCreationAttributes> {
    public review_id!: number;
    public user_id!: number;
    public doc_id!: number;
    public rating!: number;
    public comment!: string | null;
    public created_at!: Date;
    public updated_at!: Date;

    static associate(models: any) {
      this.belongsTo(models.User, { foreignKey: "user_id", as: "reviewer" });
      this.belongsTo(models.Document, { foreignKey: "doc_id" });
    }
  }
  Review.init(
    {
      review_id: {
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
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: "Review",
      tableName: "Reviews",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Review;
};
