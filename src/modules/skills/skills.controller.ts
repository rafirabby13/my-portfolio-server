import { Request, Response } from "express"
import { prisma } from "../../config/db"

const getAllSkills = async (req: Request, res: Response) => {
    const skills = await prisma.skill.findMany()
    res.send({skills})
    return skills
}

export const skillsController = {
    getAllSkills
}