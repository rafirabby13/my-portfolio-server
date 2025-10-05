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

        const result = await postsService.createPost(req.body)

        // Check if the service returned a success flag
        if (result.success) {
            res.status(201).json({
                message: result.message || "Post created successfully",
                success: true,
                data: result.data
            })
        } else {
            res.status(400).json({
                message: result.message || "Failed to create post",
                success: false
            })
        }
    } catch (error: any) {
        console.error("Error in createPost controller:", error)
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        })
    }
}
const deletePost = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id)

        if (isNaN(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            })
        }

        const result = await postsService.deletePost(blogId)

        if (result.success) {
            res.status(200).json({
                message: result.message || "Post deleted successfully",
                success: true
            })
        } else {
            res.status(404).json({
                message: result.message || "Post not found",
                success: false
            })
        }
    } catch (error: any) {
        console.error("Error in deletePost controller:", error)
        res.status(500).json({
            message: error.message || "Failed to delete post",
            success: false
        })
    }
}
const updatePost = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id)
        
        if (isNaN(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            })
        }

        const payload = req.body

        const result = await postsService.updatePost(blogId, payload)
        
        if (result.success) {
            res.status(200).json({
                message: result.message || "Post updated successfully",
                success: true,
                data: result.data
            })
        } else {
            res.status(404).json({
                message: result.message || "Post not found",
                success: false
            })
        }
    } catch (error: any) {
        console.error("Error in updatePost controller:", error)
        res.status(500).json({ 
            message: error.message || "Failed to update post",
            success: false 
        })
    }
}
const getASinglePost = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id)
        
        if (isNaN(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            })
        }
        
        const result = await postsService.getASinglePost(blogId)
        
        if (result.success) {
            res.status(200).json({
                success: true,
                data: result.data
            })
        } else {
            res.status(404).json({
                success: false,
                message: result.message
            })
        }
    } catch (error: any) {
        console.error("Error in getASinglePost controller:", error)
        res.status(500).json({ 
            message: "Failed to fetch post",
            success: false 
        })
    }
}

export const postsController = {
    getAllposts,
    createPost,
    deletePost,
    updatePost,
    getASinglePost
}