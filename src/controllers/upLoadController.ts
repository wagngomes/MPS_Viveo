import express, { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client"; // Importa Prisma para usar a classe Decimal
import fs from "node:fs";
import multer from "multer";
import app from "../server";
import storage from "../lib/multerConfig";
import csv from "csv";

const prisma: PrismaClient = new PrismaClient();

const upload: multer.Multer = multer({ storage: storage });

interface MulterRequest extends Request {
  file?: Express.Multer.File; // Torna a propriedade 'file' opcional
}

class UpLoadController {
  static async uploadSaldos(req: MulterRequest, res: Response) {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo foi enviado.");
    }

    const arquivoImportado = "./src/lib/uploads/" + req.file.filename;

    try {
      // Lê e processa o arquivo CSV
      const parser = fs
        .createReadStream(arquivoImportado)
        .pipe(csv.parse({ columns: true, delimiter: ";" }));

      for await (const data of parser) {
        const dadosTratados = {
          codigo: data.codigo,
          filial: data.filial,
          empresa: data.empresa,
          descricao: data.descricao,
          fornecedor: data.fornecedor,
          tributacao: data.tributacao,
          status: data.status,
          curva: data.curva,
          b_o_: data.b_o_,
          comprador: data.comprador,
          rota: data.rota,
          forecast: new Prisma.Decimal(data.forecast || 0), // Converte para Decimal
          vendido: new Prisma.Decimal(data.vendido || 0), // Converte para Decimal
          media: new Prisma.Decimal(data.media || 0), // Converte para Decimal
          classe: data.classe,
          estoque: new Prisma.Decimal(data.estoque || 0), // Converte para Decimal
          po_compas: new Prisma.Decimal(data.po_compas || 0), // Converte para Decimal
          transferencias: new Prisma.Decimal(data.transferencias || 0), // Converte para Decimal
          estoque_total: new Prisma.Decimal(data.estoque_total || 0), // Converte para Decimal
          CMV: new Prisma.Decimal(data.CMV || 0), // Converte para Decimal
          politica: new Prisma.Decimal(data.politica || 0), // Converte para Decimal
          periodo: data.periodo,
        };

        await prisma.saldo.create({
          data: dadosTratados,
        });
      }

      // Retorna uma resposta de sucesso
      res.status(200).send("Upload e processamento concluídos com sucesso.");
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error);
      res.status(500).send("Erro ao processar o arquivo.");
    }
  }
}

export default UpLoadController;
