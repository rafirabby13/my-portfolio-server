import { Request, Response } from "express"
import { prisma } from "../../config/db"

const getAllProjects = async (req: Request, res: Response) => {
    const projects = await prisma.project.findMany()
    res.send({projects})

}

export const ProjectsController = {
    getAllProjects
}