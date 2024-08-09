import express, {Request, Response} from 'express'

const server = express()

server.get("/", (req: Request, res: Response) => {
    return res.status(200).json({message: "servidor no ar"})
})

server.listen(5000, () => {
    console.log("server on")
})

