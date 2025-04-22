// models/category.model.ts
import Sequelize, { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize"; // your Sequelize instance

export class Category extends Model {
  public id!: number;
  public label!: string;
  public parentId!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Category.belongsTo(models.Category, {
      as: "parent",
      foreignKey: "parentId",
    });
    Category.hasMany(models.Category, {
      as: "children",
      foreignKey: "parentId",
    });
  }
}

Category.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "categories",
  }
);
