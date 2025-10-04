import { Request, Response } from "express"
import { prisma } from "../../config/db"
import { postsService } from "./posts.services"


const getAllposts = async (req: Request, res: Response) => {
    try {
        const users = await postsService.getAllposts()
        res.status(200).send({ users })
    } catch (error) {
        res.send({ message: error })
    }

}
const createPost = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const user = await postsService.createPost(req.body)
        res.status(201).send({ 
            message: "user created Successfully",
            success: true,
            user
        })
    } catch (error) {
        res.send({ message: error })
    }

}

export const postsController = {
    getAllposts,
    createPost
}