import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import MainRouter from "./routes";

export default class Server {
  expressInstance: express.Express;

  constructor() {
    this.expressInstance = express();
    this.middlewareSetup();
    this.routesSetup();
  }

  private middlewareSetup() {
    // Setup common security protection (Helmet should come first)
    this.expressInstance.use(helmet());

    // Setup Cross Origin access (CORS can be configured as needed)
    this.expressInstance.use(cors());

    // Setup requests format parsing (BodyParser should come before other routes)
    this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
    this.expressInstance.use(bodyParser.json());

    // Setup requests gZip compression (Should be the last middleware)
    this.expressInstance.use(compression());
  }

  private routesSetup() {
    // Instantiate mainRouter object
    let router = new MainRouter().router;

    // Add to server routes
    this.expressInstance.use("/", router);
  }
}
