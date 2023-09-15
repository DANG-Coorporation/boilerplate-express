import sequelize, { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configConstants from "./constants";
dotenv.config();

export default class Database {
  db: string;
  user: string;
  password: string;
  host: string;
  port: number;
  maxPool: number;
  minPool: number;
  database: sequelize.Sequelize;

  constructor() {
    this.db = configConstants.DB_NAME;
    this.user = configConstants.DB_USER;
    this.password = configConstants.DB_PASS;
    this.host = configConstants.DB_HOST;
    this.port = configConstants.DB_PORT;
    this.maxPool = configConstants.DB_MAX_POOL;
    this.minPool = configConstants.DB_MIN_POOL;
    this.database = new Sequelize(this.db, this.user, this.password, {
      host: this.host,
      dialect: "mysql",
      //   dialectOptions: {
      //     encrypt: false,
      //   },
      port: this.port,
      logging: false,
      operatorsAliases: {
        $and: sequelize.Op.and,
        $or: sequelize.Op.or,
        $eq: sequelize.Op.eq,
        $gt: sequelize.Op.gt,
        $lt: sequelize.Op.lt,
        $lte: sequelize.Op.lte,
        $like: sequelize.Op.like,
      },
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
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });

    this.database.sync({
      alter: false,
      force: false,
      // Using 'force' will drop any table defined in the models and create them again.
      // force: true
    });
  }
}
