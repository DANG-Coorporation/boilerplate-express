import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import MainRouter from "./routes";

export default class server {
  expressInstance: express.Express;

  constructor() {
    this.expressInstance = express();
    this.middlewareSetup();
    this.routesSetup();
  }

  private middlewareSetup() {
    // Setup requests gZip compression
    this.expressInstance.use(compression());

    // Setup common security protection
    this.expressInstance.use(helmet());

    // Setup Cross Origin access
    this.expressInstance.use(cors());

    // Setup requests format parsing (Only JSON requests will be valid)
    this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
    this.expressInstance.use(bodyParser.json());
  }

  private routesSetup() {
    // Instantiate mainRouter object
    let router = new MainRouter().router;

    // Add to server routes
    this.expressInstance.use("/", router);
  }
}
