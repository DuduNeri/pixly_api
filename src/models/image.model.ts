import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export class Image extends Model {
  public id!: string;
  public name!: string;
  public type!: string;
  public data!: string;
}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.TEXT("long"), 
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "images",
    timestamps: true,
  }
);

export default Image;
