import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient()

class AuthController {

    static authSchema = z.object({
        name: z.string().optional(),
        email: z.string().email()
    })

    static async login(req: Request, res: Response) {

        const loginData = AuthController.authSchema.safeParse(req.body)

        if (!loginData.success) {
            return res.status(400).json({ error: loginData.error.errors })
        }
        try {
            const userLogin = await prisma.user.findUnique({
                where: {
                    email: loginData.data?.email
                }, select: {
                    name: true,
                    email: true,
                    password: true
                }
            })
            if (!userLogin) {
                throw new Error('User not exist')
            }
            return res.status(200).send(userLogin)
        }catch(error) {
            return res.status(500).json({error: (error as Error).message})
        }
    }

}

export default AuthController