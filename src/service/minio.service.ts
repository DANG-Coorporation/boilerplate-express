import * as Minio from "minio";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique object names
import { Readable } from "stream";
// @ts-ignore
import { streamToBuffer } from "stream-to-buffer";
import * as fs from "fs";
import configConstants from "../config/constants";
import { promisify } from "util";
import { createReadStream } from "fs";
const readFile = promisify(createReadStream);

export default class MinioService {
  async minioClient() {
    return new Minio.Client({
      endPoint: configConstants.MINIO_HOST,
      port: configConstants.MINIO_PORT,
      useSSL: configConstants.MINIO_USE_SSL === "true",
      accessKey: configConstants.MINIO_ACCESS_KEY,
      secretKey: configConstants.MINIO_SECRET_KEY,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      if (!file) {
        throw new Error("No file provided");
      }
      const filePath = __dirname + "/../../" + file.path;
      const buffer = await this.getFileBufferAndLength(filePath);

      const bucketName = "eventopia"; // Replace with your bucket name
      const objectName = `images/${uuidv4()}-${file.originalname}`; // Use the original file name as the object name

      const minioClient = await this.minioClient();

      await minioClient.putObject(
        bucketName,
        objectName,
        buffer.buffer,
        buffer.length
      );

      console.info(
        `File ${objectName} uploaded successfully to bucket ${bucketName}`
      );

      return `http://nawaytes.cloud:9000/${bucketName}/${objectName}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  private async readFileAsBuffer(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  private async getFileBufferAndLength(filePath: string) {
    const fileBuffer = await this.readFileAsBuffer(filePath);
    return {
      buffer: fileBuffer,
      length: fileBuffer.length,
    };
  }

  async getBuffer(bucketName: string, pathName: string): Promise<Buffer> {
    try {
      const minioClient = await this.minioClient();
      const stream = await minioClient.getObject(bucketName, pathName);
      const buffer = await streamToBuffer(stream);
      return buffer;
    } catch (error) {
      console.error("Error getting object from MinIO:", error);
      throw new Error("Failed to get object from MinIO"); // Re-throw the error for handling at the calling code
    }
  }
}
