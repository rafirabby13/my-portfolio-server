import express from 'express'


const app = express()

app.get("/", (req, res)=>{
    res.status(200).send({
        message: "Hello to my Portfolio"
    })
})


export default app;