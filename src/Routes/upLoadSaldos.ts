import express, { Router } from "express"
import UpLoadController from "../controllers/upLoadController"
import storage from '../lib/multerConfig'
import multer from 'multer'



const importSaldosRouter = express.Router()
const upload: multer.Multer = multer({storage: storage})


importSaldosRouter.post('/importsaldos',upload.single('file'), UpLoadController.uploadSaldos)




export default importSaldosRouter

