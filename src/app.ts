import express from 'express'
import { skillRouter } from './modules/skills/skills.routes'


const app = express()

app.use("/api/v1/skill", skillRouter)
app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello to my Portfolio"
    })
})


export default app;