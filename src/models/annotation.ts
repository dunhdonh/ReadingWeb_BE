"use strict";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { IAnnotation } from "../interfaces/annotation.interface";

interface AnnotationCreationAttributes extends Optional<IAnnotation, "annotation_id" | "created_at" | "updated_at"> {}
export default (sequelize: Sequelize) => {
  class Annotation extends Model<IAnnotation, AnnotationCreationAttributes> {
    public annotation_id!: number;
    public user_id!: number;
    public doc_id!: number;
    public page_number!: number;
    public content!: string | null;
    public color_code!: string;
    public created_at!: Date;
    public updated_at!: Date;

    static associate(models: any) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(models.Document, { foreignKey: "doc_id" });
    }
  }
  Annotation.init(
    {
      annotation_id: {
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
      page_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      color_code: {
        type: DataTypes.STRING,
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
      modelName: "Annotation",
    },
  );
  return Annotation;
};
