import bodyParser from "body-parser";
import { Express } from "express";
import importSaldosRouter from "../Routes/upLoadSaldos";
import saldosRouter from "./saldosRoutes";

const configureRoutes = (app: Express) => {
  app.use(bodyParser.json());
  app.use(importSaldosRouter);
  app.use(saldosRouter);
};

export default configureRoutes;
