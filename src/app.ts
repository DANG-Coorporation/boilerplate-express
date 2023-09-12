import express, { Express, Request, Response } from "express";
import commonRoute from "./module/common";

const app: Express = express();
const PORT: number = 4001;

app.use("/", commonRoute);
app.listen(PORT, () => console.log(`server is serving at : ${PORT}`));
