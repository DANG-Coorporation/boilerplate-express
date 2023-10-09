import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

// Database connection instance
const databaseInstance = Database.database;

// User Interface
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  uniqueId: string;
  password: string;
  googleUid?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}
export interface UserInstance extends Required<UserAttributes> {}
// Sequelize Model
class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public uniqueId!: string;
  public googleUid!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    uniqueId: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    googleUid: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize: databaseInstance,
  }
);

export default Users;
