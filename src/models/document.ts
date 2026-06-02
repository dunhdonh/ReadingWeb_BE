'use strict';
import { Sequelize, DataTypes, Model } from "sequelize";
import { IDocument } from "../interfaces/document.interface";

export default (sequelize: Sequelize) => {
  class Document extends Model<IDocument> implements IDocument {
    public document_id!: number;
    public uploader_id!: number;
    public category_id!: number;
    public title!: string;
    public description!: string;
    public file_url!: string;
    public thumbnail_url!: string;
    public file_type!: string;
    public price_credits!: number;
    public status!: string;
    public view_count!: number;
    public download_count!: number;
    public created_at!: Date;
    public updated_at!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  Document.init(
    {
      document_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uploader_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "user_id" },
        onDelete: "CASCADE",
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Categories", key: "category_id" },
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      file_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price_credits: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      view_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      download_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
  }, {
    sequelize,
    modelName: 'Document',
    tableName: 'Documents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Document;
};