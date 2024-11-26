import express, { Router } from "express";
import { SaldoController } from "../controllers/saldosController";

const saldosRouter = express.Router();

saldosRouter.get("/saldos", SaldoController.listaDdosDoItem);

export default saldosRouter;
