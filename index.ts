import express from "express";
export default class server {
  expressInstance: express.Express;

  constructor() {
    this.expressInstance = express();
    this.middlewareSetup();
    this.routesSetup();
  }

  private middlewareSetup() {}

  private routesSetup() {}
}
