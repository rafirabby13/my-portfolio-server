
import { prisma } from "../../config/db"
import { CreateUserPayload } from "../../utils/type.user"
import bcrypt from "bcryptjs";

const getAllusers = async () => {
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
const createUser = async (payload: CreateUserPayload) => {
    const hashedPassword = await bcrypt.hash(payload.password as string, Number(process.env.PASS_SALT))
    const user = await prisma.user.create({
        data: {
            email: payload.email,
            name: payload.name,
            image: payload.image,
            phone: payload.phone,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            image: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
        },
    })
    return user

}


export const userService = {
    getAllusers,
    createUser
}