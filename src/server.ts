import app from "./app"
import { prisma } from "./config/db"

const connectDb = async () => {
    try {
        await prisma.$connect()
        console.log("******.....Db Connected Successfullyy........ ")

    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}

const startServer = async () => {
    try {
       await connectDb()
        app.listen(5000, () => {
            console.log("******........Portfolio Server is running...****")
        })

    } catch (error) {
        console.log(error)
    }


}
 startServer()