import { Request, Response } from "express"
import { prisma } from "../../config/db"
import { userService } from "./user.services"


const getAllusers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllusers()
        res.status(200).send({ users })
    } catch (error) {
        res.send({ message: error })
    }

}
const getASingleUser = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string
        console.log(email)
        const user = await userService.getASingleUser(email)
        res.status(200).send({ user })
    } catch (error) {
        res.send({ message: error })
    }

}
const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body)

        if (result.success) {
            res.status(201).json({
                message: result.message || "User created successfully",
                success: true,
                data: result.data
            })
        } else {
            // Determine appropriate status code based on error
            let statusCode = 400
            if (result.message?.includes("already exists")) {
                statusCode = 409 // Conflict
            }

            res.status(statusCode).json({
                message: result.message,
                success: false
            })
        }
    } catch (error: any) {
        console.error("Error in createUser controller:", error)
        res.status(500).json({
            message: error.message || "Failed to create user",
            success: false
        })
    }
}

export const usersController = {
    getAllusers,
    createUser,
    getASingleUser
}