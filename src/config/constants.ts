import dotenv from "dotenv";
dotenv.config();

const configConstants = {
  DB_NAME: process.env.DB_NAME ?? "eventopia",
  DB_USER: process.env.DB_USER ?? "root",
  DB_PASS: process.env.DB_PASS ?? "db_pass",
  DB_HOST: process.env.DB_HOST ?? "127.0.0.1",
  DB_PORT: parseInt(process.env.DB_PORT ?? "1433", 10),
  DB_MAX_POOL: parseInt(process.env.MAX_POOL ?? "20", 10),
  DB_MIN_POOL: parseInt(process.env.MIN_POOL ?? "1", 10),
  JWT_SECRET_ACCESS_TOKEN: process.env.JWT_SECRET_ACCESS_TOKEN ?? "secret",
  JWT_SECRET_REFRESH_TOKEN: process.env.JWT_SECRET_REFRESH_TOKEN ?? "secret",
  MINIO_HOST: process.env.MINIO_HOST ?? "127.0.0.1",
  MINIO_PORT: parseInt(process.env.MINIO_PORT ?? "9000", 10),
  MINIO_USE_SSL: process.env.MINIO_USE_SSL ?? "false",
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY ?? "minio",
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY ?? "minio123",
};
export default configConstants;
