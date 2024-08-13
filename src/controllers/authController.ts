import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { Request, Response } from "express";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import secret from '../lib/jsonSecret'

const prisma: PrismaClient = new PrismaClient()

class AuthController {

    static authSchema = z.object({
        email: z.string().email(),
        password: z.string()
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
            const validPassword = compare(loginData.data.password, userLogin.password)

            if(!validPassword) {
                throw new Error('User or password invalid')
            }

            const accessToken = sign({
                name: userLogin.name,
                email: userLogin.email
            },secret.hash, {expiresIn: 86400}

        )

        return { accessToken }

        }catch(error) {
            return res.status(500).json({error: (error as Error).message})
        }
    }

}

export default AuthController