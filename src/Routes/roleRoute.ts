import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import { z } from "zod";

const router: Router = express.Router()
const prisma: PrismaClient = new PrismaClient()

const role = z.object({
    description: z.string(),
    permission: z.string()
})

router.post("/newRole")