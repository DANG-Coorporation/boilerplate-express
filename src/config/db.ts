import sequelize, { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configConstants from "./constants";
import path from "path";
dotenv.config();

const sequelizeConfig = path.resolve(__dirname, "./config");
const env = process.env.NODE_ENV || "development";
const config = require(sequelizeConfig)[env];

class Database {
  db: string;
  user: string;
  password: string;
  host: string;
  port: number;
  maxPool: number;
  minPool: number;
  database: sequelize.Sequelize;
  private static instance: Database | null = null; // Singleton instance

  private constructor() {
    this.db = config.database;
    this.user = config.username;
    this.password = config.password;
    this.host = config.host;
    this.port = config.port;
    this.maxPool = configConstants.DB_MAX_POOL;
    this.minPool = configConstants.DB_MIN_POOL;
    this.database = new Sequelize(this.db, this.user, this.password, {
      host: this.host,
      dialect: "mysql",
      port: this.port,
      logging: false,
      pool: {
        max: this.maxPool,
        min: this.minPool,
        acquire: 30000,
        idle: 10000,
      },
    });

    this.database
      .authenticate()
      .then(() => {
        console.log("Connection database has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });

    this.database.sync({
      alter: false,
      force: false,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export default Database.getInstance(); // Export the singleton instance

