import express, { Request, Response, Router } from "express";

const commonRoute: Router = express.Router();

commonRoute.get("/", (req: Request, res: Response) => {
  res.status(200).send("HI, THIS IS TYPESCRIPT + EXPRESS SERVER");
});

export default commonRoute;
