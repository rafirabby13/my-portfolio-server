import app from "./app"
import { prisma } from "./config/db"
import { seedSuperAdmin } from "./modules/admin/seedSuperAdmin"

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
       await seedSuperAdmin()
        // app.listen(5000, () => {
        //     console.log("******........Portfolio Server is running...****")
        // })

    } catch (error) {
        console.log(error)
    }


}
 startServer()