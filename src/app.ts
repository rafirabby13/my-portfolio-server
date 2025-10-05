import express from 'express'
import { skillRouter } from './modules/skills/skills.routes'
import { projectRouter } from './modules/projects/projects.routes'
import { userRouter } from './modules/user/user.routes'
import cors from "cors"
import { authRouter } from './modules/auth/auth.routes'
import { postsRouter } from './modules/posts/posts.routes'


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