import { Router } from "express";
import { postsController } from "./posts.controller";

const router = Router()

router.get("/all-posts", postsController.getAllposts)
router.post("/", postsController.createPost)
router.post("/:id", postsController.deletePost)
router.patch("/:id", postsController.updatePost)
router.get("/single-post/:id", postsController.getASinglePost)

export const postsRouter = router