import { DataTypes, ModelDefined } from "sequelize";
import Database from "../config/db";

// Database connection instance
let databaseInstance = new Database().database;

// User Interface
export interface UserInterface {
  id: number;
  name: string;
  lastname: string;
  age: number;
}

// Sequelize Model
export const User: ModelDefined<UserInterface, UserInterface> =
  databaseInstance.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
