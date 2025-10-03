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
const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const user = await userService.createUser(req.body)
        res.status(201).send({ 
            message: "user created Successfully",
            success: true,
            user
        })
    } catch (error) {
        res.send({ message: error })
    }

}

export const usersController = {
    getAllusers,
    createUser
}