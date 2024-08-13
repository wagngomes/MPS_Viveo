import express, { Router } from "express";
import RoleController from "../controllers/RoleController";

const roleRouter: Router = express.Router()


roleRouter.post("/newRole", RoleController.createRole)
roleRouter.get("/allRoles", RoleController.listAllRoles)

export default roleRouter