import { Router } from "express";
import AuthController from "../controllers/authController";


const authrRouter = Router()

authrRouter.post("/auth/login", AuthController.login)


export default authrRouter