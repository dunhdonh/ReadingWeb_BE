'use strict';
import { Sequelize, DataTypes, Model } from "sequelize";
import { IDocumentTag } from "../interfaces/documenttag.interface";

export default (sequelize: Sequelize) => {
  class DocumentTag extends Model<IDocumentTag> implements IDocumentTag {
    public doc_id!: number;
    public tag_name!: string;
    public created_at!: Date;
    public updated_at!: Date;

    static associate(models: any) {
      this.belongsTo(models.Document, { foreignKey: 'doc_id' });
    }
  }
  DocumentTag.init({
    doc_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'Documents', key: 'doc_id' },
      onDelete: 'CASCADE',
    },
    tag_name: {
      type: DataTypes.STRING(50),
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
  }, {
    sequelize,
    modelName: 'DocumentTag',
    tableName: 'DocumentTags',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return DocumentTag;
};