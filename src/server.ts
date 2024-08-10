import express, {Request, Response} from 'express'

const app = express()

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({message: "servidor no ar"})
})

app.listen(5000, () => {
    console.log("server on")
})

module.exports = app