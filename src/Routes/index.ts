import bodyParser from "body-parser";
import { Express } from "express";
import roleRouter from "./roleRoute";
import authrRouter from "./authRoute";



const configureRoutes = (app: Express) => {

    app.use(bodyParser.json())
    app.use(roleRouter)
    app.use(authrRouter)

}


export default configureRoutes