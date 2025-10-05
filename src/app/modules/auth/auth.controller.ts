import { Request, Response } from "express"
import { authService } from "./auth.service"

const userLogin = async (req: Request, res: Response) => {
    try {
        console.log("data......",req.body)
        const result = await authService.userLogin(req.body)

        if (!result.success) {
            return res.status(401).send({
                success: false,
                message: result.message
            });
        }
        res.status(200).send({
            message: "user logged In Successfully",
            success: true,
            user: result.user

        })
    } catch (error) {
        res.status(400).send({
            message: "something went wrong",
            success: false,
            error
        })
    }

}

export const authController = {
    userLogin
} 