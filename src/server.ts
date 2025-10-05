import app from "./app"
import { prisma } from "./config/db"
import { seedSuperAdmin } from "./modules/admin/seedSuperAdmin"
import { VercelRequest, VercelResponse } from "@vercel/node";

// const connectDb = async () => {
//     try {
        
//         console.log("******.....Db Connected Successfullyy........ ")

//     } catch (error) {
//         console.log(error)
//         process.exit(1)

//     }
// }

const startServer = async () => {
    try {
        await prisma.$connect()
        await seedSuperAdmin()
        // app.listen(5000, () => {
        //     console.log("******........Portfolio Server is running...****")
        // })

    } catch (error) {
        console.log(error)
    }


}


export default async function handler(req: VercelRequest, res: VercelResponse) {
    
    try {
    await startServer() // connect once per cold start
    app(req, res); // pass request to Express
  } catch (error) {
    console.error("Serverless handler error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}