'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Document.init({
    uploader_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    file_url: DataTypes.STRING,
    thumbnail_url: DataTypes.STRING,
    file_type: DataTypes.STRING,
    price_credits: DataTypes.INTEGER,
    status: DataTypes.STRING,
    view_count: DataTypes.INTEGER,
    download_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};