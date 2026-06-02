"use strict";
import { Sequelize, DataTypes, Model } from "sequelize";
import { ICategory } from "../interfaces/category.interface";

export default (sequelize: Sequelize) => {
  class Category extends Model<ICategory> implements ICategory {
    public category_id!: number;
    public name!: string;
    public parent_id!: number | null;
    public created_at!: Date;
    public updated_at!: Date;
    
    static associate(models : any) {
      this.belongsTo(models.Category, {
        foreignKey: "parent_id",
        as: "parent",
      });
      this.hasMany(models.Category, {
        foreignKey: "parent_id",
        as: "subCategories",
      });

      this.hasMany(models.Document, { foreignKey: "category_id" });
    }
  }
  Category.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
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
      modelName: "Category",
      tableName: "Categories",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Category;
};
