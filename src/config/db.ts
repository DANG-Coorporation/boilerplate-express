import sequelize, { Sequelize } from "sequelize";
import dotenv from "dotenv";
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
    console.log(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      process.env.DB_HOST,
      process.env.DB_PORT
    );
    this.db = process.env.DB_NAME ?? "db_name";
    this.user = process.env.DB_USER ?? "db_user";
    this.password = process.env.DB_PASS ?? "db_pass";
    this.host = process.env.DB_HOST ?? "db_host";
    this.port = parseInt(process.env.DB_PORT || "1433", 10);
    this.maxPool = parseInt(process.env.MAX_POOL || "20", 10);
    this.minPool = parseInt(process.env.MIN_POOL || "1", 10);
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
      // Using 'force' will drop any table defined in the models and create them again.
      // force: true
    });
  }
}
