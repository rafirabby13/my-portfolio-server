import express from 'express'
import { skillRouter } from './modules/skills/skills.routes'
import { projectRouter } from './modules/projects/projects.routes'


const app = express()

app.use("/api/v1/skill", skillRouter)
app.use("/api/v1/project", projectRouter)
app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello to my Portfolio"
    })
})


export default app;