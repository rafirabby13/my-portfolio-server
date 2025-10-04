
import { prisma } from "../../config/db"
import { CreatePostPayload, CreateUserPayload, UpdatePostPayload } from "../../utils/type.user"
import bcrypt from "bcryptjs";

const getAllposts = async () => {
    const posts = await prisma.post.findMany()
    return posts

}
const createPost = async (payload: CreatePostPayload) => {
    const user = await prisma.post.create({
        data: payload
       
    })
    return user

}
const deletePost = async (blogId: number) => {
    await prisma.post.delete({
        where: {
            id: blogId
        }
    })
    return {}

}
const updatePost = async (blogId: number,payload: UpdatePostPayload) => {
    const post= await prisma.post.update({
        where: {
            id:blogId
        },
        data: payload
    })
    return post

}
const getASinglePOst = async (blogId: number) => {
    const post= await prisma.post.findUnique({
        where: {
            id:blogId
        }
    
    })
    return post

}


export const postsService = {
    getAllposts,
    createPost,
    deletePost,
    updatePost,
    getASinglePOst
}