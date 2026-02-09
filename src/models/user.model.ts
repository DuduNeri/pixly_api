// src/models/user.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

export default User;
