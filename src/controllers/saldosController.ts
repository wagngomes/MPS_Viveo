import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class SaldoController {
  static async listaDdosDoItem(req: Request, res: Response) {
    const { codigo } = req.body;

    const dadosProduto = await prisma.saldo.findMany({
      where: {
        codigo,
      },
      select: {
        codigo: true,
        descricao: true,
        fornecedor: true,
        tributacao: true,
        estoque: true,
      },
    });
    return res.status(200).json(dadosProduto);
  }
}
