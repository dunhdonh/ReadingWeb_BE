'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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
  });
  return DocumentTag;
};