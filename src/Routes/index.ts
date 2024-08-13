import bodyParser from "body-parser";
import app from "../server"
import roleRouter from "./roleRoute";
import authrRouter from "./authRoute";
import { Express } from "express";


const configureRoutes = (app: Express) => {

    app.use(bodyParser.json())
    app.use(roleRouter)
    app.use(authrRouter)

}


export default configureRoutes