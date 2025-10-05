
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
const getASingleUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    return user

}
const createUser = async (payload: CreateUserPayload) => {
    try {
        // 1. Validate required fields
        if (!payload.email || !payload.name || !payload.password) {
            return { 
                success: false, 
                message: "Email, name, and password are required" 
            }
        }

        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(payload.email)) {
            return { 
                success: false, 
                message: "Invalid email format" 
            }
        }

        // 3. Validate password strength
        if (payload.password.length < 6) {
            return { 
                success: false, 
                message: "Password must be at least 6 characters long" 
            }
        }

        // 4. Normalize email
        const normalizedEmail = payload.email.trim().toLowerCase()

        // 5. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
        })

        if (existingUser) {
            return { 
                success: false, 
                message: "User with this email already exists" 
            }
        }

        // 6. Hash password
        const hashedPassword = await bcrypt.hash(
            payload.password, 
            Number(process.env.PASS_SALT) || 10
        )

        // 7. Create user
        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                name: payload.name.trim(),
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

        return { 
            success: true, 
            data: user,
            message: "User created successfully" 
        }

    } catch (error: any) {
        console.error("Error creating user:", error)
        
        // Handle Prisma unique constraint error
        if (error.code === 'P2002') {
            return { 
                success: false, 
                message: "User with this email already exists" 
            }
        }

        return { 
            success: false, 
            message: "Failed to create user" 
        }
    }
}

export const userService = {
    getAllusers,
    createUser,
    getASingleUser
}