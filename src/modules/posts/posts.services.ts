
import { prisma } from "../../config/db"
import { CreatePostPayload, CreateUserPayload } from "../../utils/type.user"
import bcrypt from "bcryptjs";

const getAllposts = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            image: true,

        }
    })
    return users

}
const createPost = async (payload: CreatePostPayload) => {
    const user = await prisma.post.create({
        data: payload
       
    })
    return user

}


export const postsService = {
    getAllposts,
    createPost
}