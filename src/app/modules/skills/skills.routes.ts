import { Router } from "express";
import { skillsController } from "./skills.controller";

const  router = Router()

router.get("/", skillsController.getAllSkills)

export const skillRouter = router