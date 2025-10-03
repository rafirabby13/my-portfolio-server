import { Router } from "express";
import { usersController } from "./user.controller";

const  router = Router()

router.get("/",usersController.getAllusers)
router.post("/", usersController.createUser)

export const userRouter = router