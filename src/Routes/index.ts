import bodyParser from "body-parser";
import { Express } from "express";
import importSaldosRouter from "../Routes/upLoadSaldos";

const configureRoutes = (app: Express) => {
  app.use(bodyParser.json());
  app.use(importSaldosRouter);
};

export default configureRoutes;
