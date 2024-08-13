import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { Request, Response } from "express";

const prisma: PrismaClient = new PrismaClient()

class RoleController {

    static roleSchema = z.object({
        description: z.string(),
        permission: z.string()
    })
    
    static async createRole(req: Request, res: Response) {

        const newRoleData = RoleController.roleSchema.safeParse(req.body)
        if(!newRoleData.success) {
            return res.status(400).json({error: newRoleData.error.errors})
        }

        try {
            const newRole = await prisma.role.create({
                data:newRoleData.data})
            return res.status(201).json(newRole)
        } catch (error) {
            return res.status(500).json({error: (error as Error).message})
        }
    }
    static async listAllRoles(req: Request, res: Response) {

        try{
            const allRoles = await prisma.role.findMany()
            return res.status(200).json(allRoles)
        }catch(error) {
            return res.status(500).json({error: (error as Error).message})
        }
    }

}
export default RoleController



