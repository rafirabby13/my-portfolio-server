import { Request, Response } from "express"
import { prisma } from "../../config/db"
import { postsService } from "./posts.services"


const getAllposts = async (req: Request, res: Response) => {
    try {
        const posts = await postsService.getAllposts()
        res.status(200).send({ posts })
    } catch (error) {
        res.send({ message: error })
    }

}


const createPost = async (req: Request, res: Response) => {
    try {
        console.log("data.........", req.body)
        
        
        // Create payload with parsed data and image path
      
        const user = await postsService.createPost(req.body)
        res.status(201).send({
            message: "post created Successfully",
            success: true,
            user
        })
    } catch (error) {
        res.send({ message: error })
    }

}
const deletePost = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id)
        console.log("data.........", blogId)
        
        // Create payload with parsed data and image path
      
        const user = await postsService.deletePost(blogId)
        res.status(201).send({
            message: "post deleted Successfully",
            success: true,
            user
        })
    } catch (error) {
        res.send({ message: error })
    }

}
const updatePost = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id)
        console.log("data.........", blogId)
        const payload= req.body
        
        // Create payload with parsed data and image path
      
        const updatedPost = await postsService.updatePost(blogId,payload)
        res.status(201).send({
            message: "post updated Successfully",
            success: true,
            updatedPost
        })
    } catch (error) {
        res.send({ message: error })
    }

}
const getASinglePOst = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id)
       
        
        // Create payload with parsed data and image path
      
        const post = await postsService.getASinglePOst(blogId)
        res.status(201).send({
            message: "post fetched Successfully",
            success: true,
            post
        })
    } catch (error) {
        res.send({ message: error })
    }

}

export const postsController = {
    getAllposts,
    createPost,
    deletePost,
    updatePost,
    getASinglePOst
}