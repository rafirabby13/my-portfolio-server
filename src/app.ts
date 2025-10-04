import express from 'express'
import { skillRouter } from './modules/skills/skills.routes'
import { projectRouter } from './modules/projects/projects.routes'
import { userRouter } from './modules/user/user.routes'
import cors from "cors"
import { authRouter } from './modules/auth/auth.routes'


const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/skill", skillRouter)
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/auth", authRouter)
app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello to my Portfolio"
    })
})


export default app;