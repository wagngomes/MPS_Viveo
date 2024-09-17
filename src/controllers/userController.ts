import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma: PrismaClient = new PrismaClient()

class UserController {

    static userSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        roleId: z.number()
    })

    static async createUser(req:Request, res:Response) {

        const newUserData = UserController.userSchema.safeParse(req.body)
        if(!newUserData.success) {
            return res.status(400).json({error: newUserData.error.errors})
        }

        try{
            const newUser = await prisma.user.create({
                data: newUserData.data
            })
            return res.status(201).json(newUser)
        }catch(error) {
            return res.status(500).json({error: (error as Error).message})
        }

    }


}

export default UserController