import { Router } from "express";
import { postsController } from "./posts.controller";

const router = Router()

router.get("/", postsController.getAllposts)
router.post("/", postsController.createPost)

export const postsRouter = router