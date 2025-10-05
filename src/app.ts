import express from 'express'
import cors from "cors"
import { skillRouter } from './app/modules/skills/skills.routes'
import { projectRouter } from './app/modules/projects/projects.routes'
import { userRouter } from './app/modules/user/user.routes'
import { authRouter } from './app/modules/auth/auth.routes'
import { postsRouter } from './app/modules/posts/posts.routes'


const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/skill", skillRouter)
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/post", postsRouter)
app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello to my Portfolio"
    })
})
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error:", err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    })
})
export default app;