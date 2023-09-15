import dotenv from "dotenv";
dotenv.config();

const configConstants = {
  DB_NAME: process.env.DB_NAME ?? "db_name",
  DB_USER: process.env.DB_USER ?? "db_user",
  DB_PASS: process.env.DB_PASS ?? "db_pass",
  DB_HOST: process.env.DB_HOST ?? "db_host",
  DB_PORT: parseInt(process.env.DB_PORT ?? "1433", 10),
  DB_MAX_POOL: parseInt(process.env.MAX_POOL ?? "20", 10),
  DB_MIN_POOL: parseInt(process.env.MIN_POOL ?? "1", 10),
};

export default configConstants;
