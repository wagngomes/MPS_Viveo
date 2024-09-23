import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'node:fs'
import multer from 'multer'
import app from '../server'
import storage from '../lib/multerConfig'
import csv from 'csv'


const prisma: PrismaClient = new PrismaClient()


app.use("/files", express.static("uploads"))
const upload: multer.Multer = multer({storage: storage})

interface MulterRequest extends Request {
    file: Express.Multer.File; // Estendendo a interface Request para reconhecer req.file
}

class UpLoadController{

    static async uploadSaldos (req: MulterRequest, res:Response) {

        const arquivoImportado = './uploads/' + req.file.filename

        fs.createReadStream(arquivoImportado)
            .pipe(csv.parse({columns: true, delimiter: ";"}))
            .on('data', async(data) => {

                const dadosTratados = {
                    codigo: data.codigo,
                    forecast: data.forecast,
                    vendido: data.vendido,
                    estoqueTotal: data.estoqueTotal,
                    politica: data.politica,
                    coefForecast: data.coefForecast
                }

                await prisma.saldo.create({
                    data: dadosTratados
                })
            
            })
 
    }

}

export default UpLoadController