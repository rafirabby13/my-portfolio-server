import { Router } from "express";
import { ProjectsController } from "./project.controller";

const  router = Router()

router.get("/", ProjectsController.getAllProjects)

export const projectRouter = router