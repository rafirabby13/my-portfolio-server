import app from "./app"
import { prisma } from "./app/config/db";
import { seedSuperAdmin } from "./app/modules/admin/seedSuperAdmin";
import { Server } from "http";
let server: Server;
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
    await prisma.$connect();

    server = app.listen(5000, () => {
      console.log(`Parcel Server is running on port ${5000} `)
    })

  } catch (error) {
    console.log(error)
  }

}


(async () => {

  await startServer()
  await seedSuperAdmin()
})()

process.on("SIGTERM", (err) => {
  console.log("SIGTERM Signal Recieved.......server shutdown", err)

  if (server) {
    server.close(() => {
      process.exit(1)
    })

  }

  process.exit(1)
})
process.on("SIGINT", (err) => {
  console.log("SIGINT Signal Recieved......server shutdown", err)

  if (server) {
    server.close(() => {
      process.exit(1)
    })

  }

  process.exit(1)
})
process.on("unhandledRejection", (err) => {
  console.log("Unhandle Rejection detected.......server shutdown", err)

  if (server) {
    server.close(() => {
      process.exit(1)
    })

  }

  process.exit(1)
})
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected.......server shutdown", err)

  if (server) {
    server.close(() => {
      process.exit(1)
    })

  }

  process.exit(1)
})