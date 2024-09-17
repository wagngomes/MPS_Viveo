import express, {Request, Response} from 'express'
import configureRoutes from './routes'
import { Produto } from './utils/Produto'

const app = express()

configureRoutes(app)

app.get("/", (req:Request, res:Response) => {
    return res.status(200).json("appplication On")
})



app.listen(3000, () => {
    console.log("server on")
})


export default app