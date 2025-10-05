import { Router } from "express";
import { usersController } from "./user.controller";

const  router = Router()

router.get("/",usersController.getAllusers)
router.post("/", usersController.createUser)
router.get("/single-user", usersController.getASingleUser)

export const userRouter = router